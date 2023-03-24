package com.example.springepp.user;

import com.example.springepp.Matrix;
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
    List<Matrix> solvedMatrices;
    int points;
    boolean isAdmin;

    public MatrixUser(String name) {
        this.name = name;
    }

    public MatrixUser(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.solvedMatrices = new ArrayList<>();
        this.points = 0;
        this.isAdmin = false;
        this.email = email;
    }
}
