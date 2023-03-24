package com.example.springepp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MatrixUserDTO {
    String password;
    String userName;

    int points;

}
