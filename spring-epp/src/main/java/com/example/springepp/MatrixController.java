package com.example.springepp;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
            response.add(new MatrixDTO(matrix.getMatrix(), matrix.getId(), matrix.getTitle(), matrix.getCreatedAt(),
                    matrix.getCreator().getName(), matrix.getVote(), matrix.getDifficulty(), matrix.getHint()));
        }
        return response;
    }

    @GetMapping("/api/matrices/{id}")
    public MatrixDTO readMatrix(@PathVariable long id) {
        Optional<Matrix> optionalMatrix = this.matrixRepository.findById(id);
        MatrixDTO response = new MatrixDTO();
        if (optionalMatrix.isPresent()) {
            Matrix matrix = optionalMatrix.get();
            response = new MatrixDTO(matrix.getMatrix(), matrix.getId(), matrix.getTitle(), matrix.getCreatedAt(),
                    matrix.getCreator().getName(), matrix.getVote(), matrix.getDifficulty(), matrix.getHint());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Matrix not found");
        }
        return response;
    }

    @PostMapping("/api/matrices/{id}")
    public void vote(@RequestBody MatrixVoteDTO matrixVoteDTO) {
        Matrix matrix = matrixRepository.findById(matrixVoteDTO.id).get();
        matrix.setVote(matrixVoteDTO.vote);
        matrixRepository.save(matrix);
    }
}
