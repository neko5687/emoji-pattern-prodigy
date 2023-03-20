package com.example.springepp;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:4200/")
@RestController
public class MatrixController {

    private MatrixRepository matrixRepository;

    @Autowired
    public MatrixController(MatrixRepository matrixRepository) {
        this.matrixRepository = matrixRepository;
    }

    @GetMapping("/api/matrices")
    public List<MatrixDTO> read() {
        List<MatrixDTO> response = new LinkedList<>();

        for (Matrix matrix : matrixRepository.findAll()) {
            response.add(new MatrixDTO(matrix.getMatrix(), matrix.getTitle(), matrix.getCreatedAt(),
                    matrix.getCreator(), matrix.getVote(), matrix.getDifficulty()));
        }
        return response;
    }

    @GetMapping("/api/matrices/{id}")
    public MatrixDTO readMatrix(@PathVariable long id) {
        Optional<Matrix> optionalMatrix = this.matrixRepository.findById(id);
        MatrixDTO response = new MatrixDTO();
        if (optionalMatrix.isPresent()) {
            Matrix matrix = optionalMatrix.get();
            response = new MatrixDTO(matrix.getMatrix(), matrix.getTitle(), matrix.getCreatedAt(),
                    matrix.getCreator(), matrix.getVote(), matrix.getDifficulty());
        } else {
            //TODO: Errorhandling here
        }
        return response;
    }
}
