package com.example.springepp.session;

import com.example.springepp.MatrixUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Component
public class SessionRegistry {
    private final SessionRepository sessionRepository;
    private final MatrixUserRepository matrixUserRepository;

    @Autowired
    public SessionRegistry(SessionRepository sessionRepository, MatrixUserRepository matrixUserRepository) {
        this.sessionRepository = sessionRepository;
        this.matrixUserRepository = matrixUserRepository;
    }

    public String registerSession(final String username) {
        if (username == null) {
            throw new RuntimeException("Username needs to be provided");
        }

        final String sessionId = generateSessionId();

        try {
            sessionRepository.save(new Session(matrixUserRepository.findByName(username), sessionId));
        } catch (final Exception e) {
            e.printStackTrace();
        }

        return sessionId;
    }

    public String getUsernameForSession(final String sessionId) {
        return sessionRepository.findByEncodedSessionId(sessionId).get().getMatrixUser().getName();
    }

    private String generateSessionId() {
        return new String(
                Base64.getEncoder().encode(
                        UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8)
                )
        );
    }
}