package com.example.employeeroster.controller;

import com.example.employeeroster.service.MonthRosterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/monthRoster")
public class MonthRosterController {

    private final MonthRosterService monthRosterService;

    @PostMapping("/generate/{year}/{month}")
    public ResponseEntity<?> generateRoster(@PathVariable("year") int year, @PathVariable("month") int month){
        return new ResponseEntity<>(monthRosterService.generateRoster(month,year), HttpStatus.OK);
    }

    @GetMapping("/{year}/{month}")
    public ResponseEntity<?> getMonthRosterByMonth(@PathVariable("year") int year,@PathVariable("month") int month  ){
        return new ResponseEntity<>(monthRosterService.getRosterByMontYear(month,year),HttpStatus.OK);
    }
}
