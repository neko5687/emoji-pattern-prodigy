package com.example.springepp;

import com.example.springepp.session.Session;
import com.example.springepp.session.SessionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    public AuthenticationManager manager;
    @Autowired
    public SessionRegistry sessionRegistry;

    @Autowired
    public CurrentUserService currentUserService;

    @Autowired
    public MatrixUserRepository matrixUserRepository;


    @PostMapping("/login")
    public ResponseEntity<SessionResponseDTO> login(@RequestBody MatrixUserDTO user) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
        final String sessionId = sessionRegistry.registerSession(user.getUserName());
        SessionResponseDTO response = new SessionResponseDTO();
        response.setSessionId(sessionId);
        response.setUserName(user.getUserName());
        response.setPoints(matrixUserRepository.findByName(user.getUserName()).getPoints());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<BasicResponseDTO> signup(@RequestBody RegisterRequest registerRequest) {
        try {
            currentUserService.signup(registerRequest);
            BasicResponseDTO response = new BasicResponseDTO();
            response.setMessage("Registration worked");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            BasicResponseDTO error = new BasicResponseDTO();
            error.setMessage(ex.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<BasicResponseDTO> logout(@RequestBody SessionResponseDTO logoutRequest) {
        BasicResponseDTO response = new BasicResponseDTO();
        response.setMessage("Logout worked");
        return ResponseEntity.ok(response);
    }


}