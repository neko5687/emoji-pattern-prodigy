package com.example.springepp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class MatrixUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    private String email;
    @OneToMany
    List<Matrix> votedMatrices;
    int points;
    boolean isAdmin;

    public MatrixUser(String name) {
        this.name = name;
    }

    public MatrixUser(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.votedMatrices = new ArrayList<>();
        this.points = 0;
        this.isAdmin = false;
        this.email = email;
    }
}
