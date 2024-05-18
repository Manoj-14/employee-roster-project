package com.example.employeeroster.service;

import com.example.employeeroster.dto.UserResponse;
import com.example.employeeroster.model.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    @Transactional
    public User createUser(User user);
    public List<User> getAllUsers();
    public User getUserById(String userId);
    @Transactional
    public User updateUser(User user);
    @Transactional
    void deleteUser(String userId);

    User findUserByEmailAndPassword(String email, String password);

    public List<UserResponse> getUsers();
    public List<User> getAllEmployees();
}
