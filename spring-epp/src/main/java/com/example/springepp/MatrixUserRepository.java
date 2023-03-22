package com.example.springepp;

import org.springframework.data.repository.CrudRepository;

public interface MatrixUserRepository extends CrudRepository<MatrixUser, Long>  {
    MatrixUser findByName(String username);
}
