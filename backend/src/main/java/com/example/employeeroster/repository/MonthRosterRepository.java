package com.example.employeeroster.repository;

import com.example.employeeroster.model.MonthRoster;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthRosterRepository extends MongoRepository<MonthRoster,String> {
    MonthRoster findMonthRosterByMonthYear(String monthYear);
}
