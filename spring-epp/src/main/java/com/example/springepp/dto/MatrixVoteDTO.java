package com.example.springepp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MatrixVoteDTO {
    long id;
    int vote;

    public MatrixVoteDTO(long id, int vote) {
        this.id = id;
        this.vote = vote;
    }
}
