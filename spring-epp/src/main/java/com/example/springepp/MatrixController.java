package com.example.springepp;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:4200/")
@RestController
public class MatrixController {
    @GetMapping("/api/matrices")
    public String read() {
        return "Hallo";
    }
}
