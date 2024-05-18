package com.example.employeeroster.repository;

import com.example.employeeroster.model.Role;
import com.example.employeeroster.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findUserByEmpId(String empId);
    User findUserByEmailAndPassword(String email,String password);
    List<User> findAllUserByRole(Role role);
}
