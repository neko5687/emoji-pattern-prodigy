package com.example.springepp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SessionResponseDTO {
    private String sessionId;
    private String userName;
    private int points;
}
