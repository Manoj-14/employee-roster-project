package com.example.employeeroster.exception;

public class MonthRosterNotFoundException extends RuntimeException{
    public MonthRosterNotFoundException(String msg){
        super(msg);
    }
}
