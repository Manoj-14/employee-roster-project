package com.example.employeeroster.service;

import com.example.employeeroster.dto.UserResponse;
import com.example.employeeroster.exception.UserAlreadyExistsException;
import com.example.employeeroster.exception.UserNotFoundException;
import com.example.employeeroster.model.User;
import com.example.employeeroster.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        String empId = user.getEmpId();
        if(userRepository.findUserByEmpId(empId)!=null){
            throw new UserAlreadyExistsException("User Already Exists");
        } else {
            UUID password = UUID.randomUUID();
            user.setPassword(password.toString());
            return userRepository.save(user);
        }

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
        if(dbuser!=null) {
            user.setPassword(dbuser.getPassword());
            return userRepository.save(user);
        }
        else throw new UserNotFoundException("User Not Found");
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId).stream().findFirst().orElse(null);
        if(user!=null) userRepository.deleteById(userId);
        else throw new UserNotFoundException("User Not Found");
    }

    @Override
    public User findUserByEmailAndPassword(String email, String password){
        return userRepository.findUserByEmailAndPassword(email,password);
    }

    @Override
    public List<UserResponse> getUsers() {
        List<User> user = this.userRepository.findAll();
        List<UserResponse> userResponses = new ArrayList<>();

        user.forEach(user1 -> {
            UserResponse userResponse = modelMapper.map(user1,UserResponse.class);
            userResponses.add(userResponse);
        });
        return userResponses;
    }



}
