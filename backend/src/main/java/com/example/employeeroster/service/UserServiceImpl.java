package com.example.employeeroster.service;

import com.example.employeeroster.exception.UserNotFoundException;
import com.example.employeeroster.model.User;
import com.example.employeeroster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(String userId) throws UserNotFoundException {
        User user = userRepository.findById(userId).stream().findFirst().orElse(null);
        if(user!=null){
            return user;
        } else {
            throw new UserNotFoundException("User Not found");
        }
    }

    @Override
    public User updateUser(User user) {
        User dbuser = userRepository.findById(user.getId()).stream().findFirst().orElse(null);
        if(dbuser!=null) userRepository.save(user);
        else throw new UserNotFoundException("User Not Found");
        return null;
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId).stream().findFirst().orElse(null);
        if(user!=null) userRepository.deleteById(userId);
        else throw new UserNotFoundException("User Not Found");
    }
}
