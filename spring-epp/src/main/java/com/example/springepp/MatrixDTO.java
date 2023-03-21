package com.example.springepp;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
public class MatrixDTO {
    private String matrix;
    private long id;
    private String title;

    private Instant createdAt;
    private String creatorName;
    private int vote;
    private int difficulty;
    private String hint;

    public MatrixDTO(String matrix, long id, String title, Instant createdAt, String creatorName, int vote, int difficulty,String hint) {
        this.matrix = matrix;
        this.createdAt = createdAt;
        this.creatorName = creatorName;
        this.title = title;
        this.vote = vote;
        this.difficulty = difficulty;
        this.id=id;
        this.hint=hint;
    }
}
