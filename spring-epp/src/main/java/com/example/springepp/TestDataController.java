package com.example.springepp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TestDataController {
    private MatrixUserRepository matrixUserRepository;
    private MatrixRepository matrixRepository;

    @Autowired
    public TestDataController(MatrixRepository matrixRepository, MatrixUserRepository matrixUserRepository) {
        this.matrixRepository = matrixRepository;
        this.matrixUserRepository = matrixUserRepository;
    }

    @GetMapping("/api/testdata")
    public @ResponseBody String createTestData() {
        MatrixUser creator = new MatrixUser("Admin");

        matrixUserRepository.save(creator);
        matrixRepository.save(new Matrix(
                "🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋️", "Hearts and Butterflies", creator, 1));
        matrixRepository.save(new Matrix(
                "🐘🐘🦒🐘🐘🦕🐘🦒🐘🐘🦕🦒🐘🐘🦒🐘🦕🐘🐘🦒🐘❤️🦋❤️🦋️", "Very Weird Matrix", creator, 3));
        return "Testdata creation worked";
    }
}
