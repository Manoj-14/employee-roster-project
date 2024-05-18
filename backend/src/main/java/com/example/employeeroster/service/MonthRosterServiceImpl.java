package com.example.employeeroster.service;

import com.example.employeeroster.exception.InvalidMonthException;
import com.example.employeeroster.exception.MonthRosterNotFoundException;
import com.example.employeeroster.exception.RosterAlreadyExistsException;
import com.example.employeeroster.model.MonthRoster;
import com.example.employeeroster.model.Roster;
import com.example.employeeroster.model.User;
import com.example.employeeroster.repository.MonthRosterRepository;
import com.example.employeeroster.utils.CalanderUtil;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class MonthRosterServiceImpl implements MonthRosterService{
    @Autowired
    private final MonthRosterRepository monthRosterRepository;
    @Autowired
    private final RosterService rosterService;
    @Autowired
    private final UserService userService;

    @Override
    public MonthRoster addMonthRoster(MonthRoster monthRoster) throws RosterAlreadyExistsException {
        MonthRoster dbMonthRoster = monthRosterRepository.findMonthRosterByMonthYear(monthRoster.getMonthYear());
        if(dbMonthRoster != null){
            throw new RosterAlreadyExistsException("Month Roster already added");
        }
        else {
            return monthRosterRepository.save(monthRoster);
        }
    }

    @Override
    public MonthRoster generateRoster(int month, int year) throws InvalidMonthException {
        List<LocalDate> days = CalanderUtil.getListOfDatesOfMonthAndYear(month,year);
        System.out.println(days);
        List<User> employees = userService.getAllEmployees();
        List<Roster> rosterOfMonth = new ArrayList<>();
        MonthRoster monthRoster = new MonthRoster();
        monthRoster.setMonthYear(month,year);
        for(User employee:employees) {
            Roster roster = new Roster();
            roster.setUser(employee);
            roster.setMonthYear(month,year);
            List<LocalDate> weekOff = CalanderUtil.getWeekEndDates(month,year,employee.getWeekOff());
            roster.setWeekOffs(weekOff);
            List<LocalDate> workingDays = new ArrayList<>(days);
            workingDays.removeAll(weekOff);
            System.out.println(workingDays);
            System.out.println(weekOff);
            switch (employee.getShift()){
                case EVENING -> roster.setEveningShift(workingDays);
                case GENERAL -> roster.setGeneralShift(workingDays);
                case MORNING -> roster.setMorningShift(workingDays);
                default -> throw new RuntimeException("Shift Assigning Error");
            }
            rosterOfMonth.add(rosterService.createRoster(roster));
        }
        monthRoster.setRosters(rosterOfMonth);
        return addMonthRoster(monthRoster);
    }

    @Override
    public MonthRoster getRosterByMontYear(int month, int year) throws MonthRosterNotFoundException {
        String monthYear = CalanderUtil.getMonthYearInString(month,year);
        MonthRoster monthRoster = monthRosterRepository.findMonthRosterByMonthYear(monthYear);
        if(monthRoster != null){
            return monthRoster;
        }
        else {
            throw new MonthRosterNotFoundException("Roster not found for "+monthYear);
        }

    }
}
