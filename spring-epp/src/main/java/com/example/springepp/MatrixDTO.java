package com.example.springepp;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class MatrixDTO {
    private List<String> matrix;
    private String title;
    private int vote;
    private int difficulty;

    public MatrixDTO(List<String> matrix, String title, int vote, int difficulty) {
        this.matrix = matrix;
        this.title = title;
        this.vote = vote;
        this.difficulty = difficulty;
    }
}
