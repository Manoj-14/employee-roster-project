package com.example.employeeroster.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class User {
    @Id
    private String id;
    @NotNull
    private String name;
    @NotNull
    private String empId;
    @NotNull
    private String email;
    @NotNull
    private Shift shift;
    @NotNull
    private WeekOff weekOff;
    @NotNull
    private List<Role> role;
}
