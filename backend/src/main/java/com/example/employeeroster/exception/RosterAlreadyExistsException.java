package com.example.employeeroster.exception;

public class RosterAlreadyExistsException extends RuntimeException{
    public RosterAlreadyExistsException(String message){
        super(message);
    }
}
