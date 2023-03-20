package com.example.springepp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TestDataController {
    private MatrixRepository matrixRepository;

    @Autowired
    public TestDataController(MatrixRepository matrixRepository) {
        this.matrixRepository = matrixRepository;
    }

    @GetMapping("/api/testdata")
    public @ResponseBody String createTestData() {
        matrixRepository.save(new Matrix(
                "🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️", "Hearts and Butterflies", 1));
        matrixRepository.save(new Matrix(
                "🐘🐘🦒🐘🐘🦕🐘🦒🐘🐘🦕🦒🐘🐘🦒🐘🦕🐘🐘🦒🐘❤️🦋❤️", "Very Weird Matrix", 3));
        return "Testdata creation worked";
    }
}
