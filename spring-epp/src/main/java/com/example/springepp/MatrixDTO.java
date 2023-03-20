package com.example.springepp;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
@Data
@NoArgsConstructor
public class MatrixDTO {
    private String matrix;
    private String title;

    private Instant createdAt;
    private MatrixUser creator;
    private int vote;
    private int difficulty;

    public MatrixDTO(String matrix, String title, Instant createdAt, MatrixUser creator, int vote, int difficulty) {
        this.matrix = matrix;
        this.createdAt = createdAt;
        this.creator = creator;
        this.title = title;
        this.vote = vote;
        this.difficulty = difficulty;
    }
}
