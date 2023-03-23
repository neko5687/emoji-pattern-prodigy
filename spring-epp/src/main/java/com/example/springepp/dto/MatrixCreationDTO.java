package com.example.springepp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MatrixCreationDTO {

    private String title;
    private String matrix;
    private int difficulty;
    private String creatorName;
    private String hint;

    public MatrixCreationDTO(String title, String matrix, int difficulty, String creatorName, String hint) {
        this.title = title;
        this.matrix = matrix;
        this.difficulty = difficulty;
        this.creatorName = creatorName;
        this.hint = hint;
    }
}


