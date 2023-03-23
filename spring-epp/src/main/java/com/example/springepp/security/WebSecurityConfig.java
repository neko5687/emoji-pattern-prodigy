package com.example.springepp.security;

import com.example.springepp.security.PasswordEncoderConfig;
import com.example.springepp.session.SessionFilter;
import com.example.springepp.user.CurrentUserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Import(PasswordEncoderConfig.class)
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private CurrentUserService currentUserService;
    @Autowired
    private SessionFilter sessionFilter;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(
                        (request, response, ex) -> response.sendError(
                                HttpServletResponse.SC_UNAUTHORIZED,
                                ex.getMessage())
                ).and()
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/api/matrices", "/login**", "/api/testdata", "/signup").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        sessionFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/api/matrices")
                        .deleteCookies("JSESSIONID")
                        .invalidateHttpSession(true)
                );

        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(currentUserService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authProvider);
    }


}