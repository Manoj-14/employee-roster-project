package com.example.employeeroster.controller;

import com.example.employeeroster.dto.UserResponse;
import com.example.employeeroster.exception.UserNotFoundException;
import com.example.employeeroster.model.User;
import com.example.employeeroster.service.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/get")
    public ResponseEntity<?> getUsers(){
        List<UserResponse> userResponses = userService.getUsers();
        return new ResponseEntity<>(userResponses, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user){
        try{
            User savedUser = userService.createUser(user);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
            return ResponseEntity.created(location).build();
        } catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId){
        try {
            User user = userService.getUserById(userId);
            return new ResponseEntity<>(user,HttpStatus.OK);
        } catch (UserNotFoundException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user,@PathVariable String id){
        if (id==null){
            throw new NullPointerException("User Id Not Found");
        } else {
            user.setId(id);
        }
        try {
            User savedUser = userService.updateUser(user);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
            return ResponseEntity.created(location).build();
        } catch (UserNotFoundException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        try {
            userService.deleteUser(id);
            return ResponseEntity.accepted().build();
        } catch (UserNotFoundException ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{email}/{password}")
    public ResponseEntity<?> getUserByEmailPassword(@PathVariable String email,@PathVariable String password){
        try {
            User user = userService.findUserByEmailAndPassword(email,password);
            return new ResponseEntity<>(user,HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(@RequestBody Map<String,String> request){
        String email = request.get("email");
        String password = request.get("password");
        System.out.println(email+" "+password);

        User user = userService.findUserByEmailAndPassword(email,password);
        if(user==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserResponse userResponse = modelMapper.map(user,UserResponse.class);
        return new ResponseEntity<>(userResponse,HttpStatus.OK);
    }
}
