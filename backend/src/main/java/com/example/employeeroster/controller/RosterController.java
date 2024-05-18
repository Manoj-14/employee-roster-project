package com.example.employeeroster.controller;

import com.example.employeeroster.model.Roster;
import com.example.employeeroster.model.Shift;
import com.example.employeeroster.model.User;
import com.example.employeeroster.service.RosterService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@AllArgsConstructor
@RestController
@RequestMapping("/api/roster")
public class RosterController {

    @Autowired
    private final RosterService rosterService;
    @GetMapping("/{userId}")
    public CompletableFuture<ResponseEntity<Roster>> getEmployeeRoster(@PathVariable("userId") String userId, @RequestParam("year") int year, @RequestParam("month") int month){
//        int month = request.get("month");
//        int year = request.get("year");
        return rosterService.getEmployeeRoster(userId,month,year).thenApply(roster -> ResponseEntity.ok(roster));
    }

    @PutMapping("/changeShift/{userId}")
    public ResponseEntity<?> changeCurrentShift(@PathVariable("userId") String userId,@RequestBody Map<String, String> request){
        Shift fromShift = Shift.valueOf(request.get("fromShift").toUpperCase());
        Shift toShift = Shift.valueOf(request.get("toShift").toUpperCase());
        return new ResponseEntity<>(rosterService.updateShift(userId,fromShift,toShift),HttpStatus.OK);
    }

}
