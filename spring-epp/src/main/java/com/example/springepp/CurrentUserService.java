package com.example.springepp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService implements UserDetailsService {
    private final MatrixUserRepository matrixUserRepository;


    @Autowired
    public CurrentUserService(MatrixUserRepository matrixUserRepository) {
        this.matrixUserRepository = matrixUserRepository;
    }

    @Override
    public CurrentUser loadUserByUsername(String username) throws UsernameNotFoundException {
        final MatrixUser user = matrixUserRepository.findByName(username);
        if (user != null) {
            final CurrentUser currentUser = new CurrentUser();
            currentUser.setUsername(user.getName());
            currentUser.setPassword(user.getPassword());

            return currentUser;
        }
        else  {
            throw new UsernameNotFoundException("Failed to find user with username: " + username);
        }
    }
}