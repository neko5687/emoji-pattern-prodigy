package com.example.springepp;

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


    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody MatrixUserDTO user) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
        final String sessionId = sessionRegistry.registerSession(user.getUserName());
        ResponseDTO response = new ResponseDTO();
        response.setSessionId(sessionId);
        response.setUserName(user.getUserName());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest) {
        currentUserService.signup(registerRequest);
        return ResponseEntity.ok("User Registration Successful");
    }

}