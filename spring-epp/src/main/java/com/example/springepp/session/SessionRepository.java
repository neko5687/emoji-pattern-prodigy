package com.example.springepp.session;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SessionRepository extends CrudRepository<Session,String> {


    Optional<Session> findByEncodedSessionId(String s);
}
