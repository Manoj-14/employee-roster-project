package com.example.employeeroster.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;

@Document
public class Roster {
    @Id
    private String id;
    @DocumentReference
    private User user;

    private List<Date> generalShift;
    private List<Date> morningShift;
    private List<Date> nightShift;
    private List<Date> weekoffs;
    private List<Date> holidays;

    public Roster() {
    }

    public Roster(String id, User user, List<Date> generalShift, List<Date> morningShift, List<Date> nightShift, List<Date> weekoffs, List<Date> holidays) {
        this.id = id;
        this.user = user;
        this.generalShift = generalShift;
        this.morningShift = morningShift;
        this.nightShift = nightShift;
        this.weekoffs = weekoffs;
        this.holidays = holidays;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Date> getGeneralShift() {
        return generalShift;
    }

    public void setGeneralShift(List<Date> generalShift) {
        this.generalShift = generalShift;
    }

    public List<Date> getMorningShift() {
        return morningShift;
    }

    public void setMorningShift(List<Date> morningShift) {
        this.morningShift = morningShift;
    }

    public List<Date> getNightShift() {
        return nightShift;
    }

    public void setNightShift(List<Date> nightShift) {
        this.nightShift = nightShift;
    }

    public List<Date> getWeekoffs() {
        return weekoffs;
    }

    public void setWeekoffs(List<Date> weekoffs) {
        this.weekoffs = weekoffs;
    }

    public List<Date> getHolidays() {
        return holidays;
    }

    public void setHolidays(List<Date> holidays) {
        this.holidays = holidays;
    }

    @Override
    public String toString() {
        return "Roster{" +
                "id='" + id + '\'' +
                ", user=" + user +
                ", generalShift=" + generalShift +
                ", morningShift=" + morningShift +
                ", nightShift=" + nightShift +
                ", weekoffs=" + weekoffs +
                ", holidays=" + holidays +
                '}';
    }
}
