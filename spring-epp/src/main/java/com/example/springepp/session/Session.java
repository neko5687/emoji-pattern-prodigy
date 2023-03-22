package com.example.springepp.session;

import com.example.springepp.MatrixUser;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Data
public class Session {
    @Id
    private String id = UUID.randomUUID().toString();
    @ManyToOne
    private MatrixUser matrixUser;

    private String encodedSessionId;

    public Session(MatrixUser matrixUser, String encodedSessionId) {
        this.matrixUser = matrixUser;
        this.encodedSessionId = encodedSessionId;
    }
}