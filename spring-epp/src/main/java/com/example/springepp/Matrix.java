package com.example.springepp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Matrix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matrix;
    private String title;
    private int vote;
    private int difficulty;
    private Instant createdAt;

    public Matrix(String matrix, String title, int difficulty) {
        this.matrix = matrix;
        this.title = title;
        this.vote = 0;
        this.difficulty = difficulty;
        this.createdAt = Instant.now();
    }
}
