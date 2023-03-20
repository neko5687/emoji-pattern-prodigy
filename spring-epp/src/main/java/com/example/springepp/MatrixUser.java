package com.example.springepp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class MatrixUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String name;
    String password;
    @OneToMany
    List<Matrix> votedMatrices;
    int points;
    boolean isAdmin;
    public MatrixUser(String name) {
        this.name = name;
    }
}
