package com.example.employeeroster.service;

import com.example.employeeroster.exception.InvalidMonthException;
import com.example.employeeroster.model.MonthRoster;
import com.example.employeeroster.model.Roster;
import com.example.employeeroster.model.Shift;
import com.example.employeeroster.model.User;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RosterService {
    @Transactional
    Roster createRoster(Roster roster);
    @Async
    CompletableFuture<Roster> getEmployeeRoster(String user, int month, int year);
    @Transactional
    Roster updateShift(String userId,Shift fromShift,Shift toShift);
}
