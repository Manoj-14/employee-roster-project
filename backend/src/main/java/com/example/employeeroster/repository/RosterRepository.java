package com.example.employeeroster.repository;

import com.example.employeeroster.model.Roster;
import com.example.employeeroster.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RosterRepository extends MongoRepository<Roster,String> {
    Roster findRosterByUserAndMonthYear(User user,String monthYear);
}
