package com.example.springepp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Import(PasswordEncoderConfig.class)
@Service
public class CurrentUserService implements UserDetailsService {
    private final MatrixUserRepository matrixUserRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public CurrentUserService(MatrixUserRepository matrixUserRepository, BCryptPasswordEncoder passwordEncoder) {
        this.matrixUserRepository = matrixUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public CurrentUser loadUserByUsername(String username) throws UsernameNotFoundException {
        final MatrixUser user = matrixUserRepository.findByName(username);
        if (user != null) {
            final CurrentUser currentUser = new CurrentUser();
            currentUser.setUsername(user.getName());
            currentUser.setPassword(user.getPassword());

            return currentUser;
        } else {
            throw new UsernameNotFoundException("Failed to find user with username: " + username);
        }
    }

    public MatrixUser signup(RegisterRequest registerRequest) {
        System.out.println(registerRequest.getPassword());
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        System.out.println(passwordEncoder.matches(registerRequest.getPassword(), encodedPassword));
        return matrixUserRepository.save(
                new MatrixUser(registerRequest.getUsername(), encodedPassword, registerRequest.getEmail()));
    }
}