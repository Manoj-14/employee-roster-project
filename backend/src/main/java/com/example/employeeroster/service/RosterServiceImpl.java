package com.example.employeeroster.service;

import com.example.employeeroster.exception.InvalidMonthException;
import com.example.employeeroster.model.MonthRoster;
import com.example.employeeroster.model.Roster;
import com.example.employeeroster.model.Shift;
import com.example.employeeroster.model.User;
import com.example.employeeroster.repository.RosterRepository;
import com.example.employeeroster.utils.CalanderUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.awt.event.ActionEvent;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@AllArgsConstructor
@Service
public class RosterServiceImpl implements RosterService {

    @Autowired
    private final RosterRepository rosterRepository;
    @Autowired
    private final UserService userService;

    @Override
    public Roster createRoster(Roster roster){
        return rosterRepository.save(roster);
    }

    @Override
    public CompletableFuture<Roster> getEmployeeRoster(String userId, int month, int year) {
        User user = userService.getUserById(userId);
        Thread thread = Thread.currentThread();
        try {
            System.out.println("Executed");
            System.out.println(thread.threadId());
            Thread.sleep(29000);
            System.out.println(user.getName());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println(thread.getName());
        String monthYear = CalanderUtil.getMonthYearInString(month,year);
        Roster roster = rosterRepository.findRosterByUserAndMonthYear(user,monthYear);
        if(roster != null){
            return CompletableFuture.completedFuture(roster);
        }
        else {
            throw new RuntimeException("Roster not found for "+user.getName()+" of "+monthYear);
        }
    }

    @Override
    public Roster updateShift(String userId, Shift fromShift, Shift toShift) {
        String currentMonthYear = YearMonth.now().toString();
        User user = userService.getUserById(userId);
        Roster roster = rosterRepository.findRosterByUserAndMonthYear(user,currentMonthYear);
        if(roster !=null){
            switch (fromShift){
                case GENERAL -> {
                    if ((toShift == Shift.MORNING)) {
                        changeShiftDate(roster.getGeneralShift(), roster.getMorningShift(), LocalDate.now());
                    } else {
                        changeShiftDate(roster.getGeneralShift(), roster.getEveningShift(), LocalDate.now());
                    }
                }
                case MORNING -> {
                    if ((toShift == Shift.GENERAL)) {
                        changeShiftDate(roster.getMorningShift(), roster.getGeneralShift(), LocalDate.now());
                    } else {
                        changeShiftDate(roster.getMorningShift(), roster.getEveningShift(), LocalDate.now());
                    }
                }
                case EVENING -> {
                    if ((toShift == Shift.GENERAL)) {
                        changeShiftDate(roster.getEveningShift(), roster.getGeneralShift(), LocalDate.now());
                    } else {
                        changeShiftDate(roster.getEveningShift(), roster.getMorningShift(), LocalDate.now());
                    }
                }
                default -> throw new RuntimeException("Shift not found");
            }
            return rosterRepository.save(roster);
        }else {
            throw new RuntimeException("Roster Not found error");
        }

    }

    private void changeShiftDate(List<LocalDate> fromShift , List<LocalDate> toShift,LocalDate date){
        fromShift.remove(date);
        toShift.add(date);
    }
}
