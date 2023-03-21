package com.example.springepp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@NoArgsConstructor
@Entity
public class Matrix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matrix;
    private String title;
    @ManyToOne
    private MatrixUser creator;
    private int vote;
    private int difficulty;
    private Instant createdAt;
    private String hint;

    public Matrix(String matrix, String title, MatrixUser creator, int difficulty,String hint) {
        this.matrix = matrix;
        this.title = title;
        this.creator = creator;
        this.vote = 0;
        this.difficulty = difficulty;
        this.createdAt = Instant.now();
        this.hint=hint;
    }
}
