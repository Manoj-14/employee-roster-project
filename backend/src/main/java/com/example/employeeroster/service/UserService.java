package com.example.employeeroster.service;

import com.example.employeeroster.model.User;

import java.util.List;

public interface UserService {
    public User createUser(User user);
    public List<User> getAllUsers();
    public User getUserById(String userId);
    public User updateUser(User user);
    void deleteUser(String userId);
}
