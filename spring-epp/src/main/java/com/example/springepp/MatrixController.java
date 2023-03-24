package com.example.springepp;

import com.example.springepp.dto.MatrixCreationDTO;
import com.example.springepp.dto.MatrixDTO;
import com.example.springepp.dto.MatrixVoteDTO;
import com.example.springepp.dto.PointsDTO;
import com.example.springepp.user.MatrixUser;
import com.example.springepp.user.MatrixUserRepository;
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
    private MatrixUserRepository matrixUserRepository;

    @Autowired
    public MatrixController(MatrixRepository matrixRepository, MatrixUserRepository matrixUserRepository) {
        this.matrixUserRepository = matrixUserRepository;
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
        Matrix matrix = matrixRepository.findById(matrixVoteDTO.getId()).get();
        matrix.setVote(matrixVoteDTO.getVote());
        matrixRepository.save(matrix);
    }

    @PostMapping("/api/points")
    public void savePoints(@RequestBody PointsDTO pointsDTO) {
        MatrixUser user = matrixUserRepository.findByName(pointsDTO.getUserName());
        user.setPoints(user.getPoints()+ pointsDTO.getPoints());
        matrixUserRepository.save(user);
    }

    @PostMapping("api/createMatrix")
    public void createMatrix(@RequestBody MatrixCreationDTO matrixCreationDTO) {
        MatrixUser matrixUser = matrixUserRepository.findByName(matrixCreationDTO.getCreatorName());
        Matrix matrix = new Matrix(matrixCreationDTO.getMatrix(), matrixCreationDTO.getTitle(), matrixUser,
                matrixCreationDTO.getDifficulty(),matrixCreationDTO.getHint());
        matrixRepository.save(matrix);
    }

}
