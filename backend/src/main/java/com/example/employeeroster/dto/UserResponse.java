package com.example.employeeroster.dto;

import com.example.employeeroster.model.Shift;
import com.example.employeeroster.model.WeekOff;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String name;
    private String empId;
    private String email;
    private Shift shift;
    private WeekOff weekOff;
}
