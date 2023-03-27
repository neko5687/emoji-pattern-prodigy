package com.example.springepp;

import com.example.springepp.dto.*;
import com.example.springepp.user.MatrixUser;
import com.example.springepp.user.MatrixUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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

    @PostMapping("/api/solved")
    public void savePoints(@RequestBody SolvedDTO solvedDTO) {
        MatrixUser user = matrixUserRepository.findByName(solvedDTO.getUserName());
        user.setPoints(user.getPoints() + solvedDTO.getPoints());
        if (!user.getSolvedMatrices().contains(matrixRepository.findById((long) solvedDTO.getMatrixId()).get())) {
            user.getSolvedMatrices().add(matrixRepository.findById((long) solvedDTO.getMatrixId()).get());
        }
        matrixUserRepository.save(user);
    }

    @GetMapping("/api/solvedmatrices/{userName}")
    public ArrayList<Long> getSolved(@PathVariable String userName) {
        MatrixUser user = matrixUserRepository.findByName(userName);
        ArrayList<Long> response = new ArrayList<>();
        for (Matrix solvedMatrix : user.getSolvedMatrices()) {
            response.add(solvedMatrix.getId());
        }
        return response;
    }


    @PostMapping("api/createMatrix")
    public void createMatrix(@RequestBody MatrixCreationDTO matrixCreationDTO) {
        MatrixUser matrixUser = matrixUserRepository.findByName(matrixCreationDTO.getCreatorName());
        Matrix matrix = new Matrix(matrixCreationDTO.getMatrix(), matrixCreationDTO.getTitle(), matrixUser,
                matrixCreationDTO.getDifficulty(), matrixCreationDTO.getHint());
        if(matrix.getMatrix().length()==25){
        matrixRepository.save(matrix);
        }
    }

    @GetMapping("api/highscore")
    public List<MatrixUserDTO> createMatrix() {
        List<MatrixUserDTO> userList = new ArrayList<>();
        for (MatrixUser user : matrixUserRepository.findAll()) {
            MatrixUserDTO userDTO = new MatrixUserDTO();
            userDTO.setUserName(user.getName());
            userDTO.setPoints(user.getPoints());
            userList.add(userDTO);
        }
        return userList;
    }

}
