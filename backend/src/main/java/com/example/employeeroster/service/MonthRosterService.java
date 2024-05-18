package com.example.employeeroster.service;

import com.example.employeeroster.exception.InvalidMonthException;
import com.example.employeeroster.exception.MonthRosterNotFoundException;
import com.example.employeeroster.exception.RosterAlreadyExistsException;
import com.example.employeeroster.model.MonthRoster;
import org.springframework.transaction.annotation.Transactional;

public interface MonthRosterService {
    @Transactional
    MonthRoster addMonthRoster(MonthRoster monthRoster) throws RosterAlreadyExistsException;
    @Transactional
    MonthRoster generateRoster(int month, int year) throws InvalidMonthException;
    MonthRoster getRosterByMontYear(int month,int year) throws MonthRosterNotFoundException;

}
