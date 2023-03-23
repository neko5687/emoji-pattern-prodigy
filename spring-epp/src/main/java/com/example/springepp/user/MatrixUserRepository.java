package com.example.springepp.user;

import com.example.springepp.user.MatrixUser;
import org.springframework.data.repository.CrudRepository;

public interface MatrixUserRepository extends CrudRepository<MatrixUser, Long>  {
    MatrixUser findByName(String username);
}
