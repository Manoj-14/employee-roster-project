package com.example.employeeroster.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Document
public class Roster {
    @Id
    private String id;
    @DocumentReference
    private User user;
    @Indexed(unique = true)
    private String monthYear;
    private List<LocalDate> generalShift = new ArrayList<>();
    private List<LocalDate> morningShift = new ArrayList<>();
    private List<LocalDate> eveningShift = new ArrayList<>();
    private List<LocalDate> weekOffs = new ArrayList<>();
    private List<LocalDate> holidays = new ArrayList<>();

    public Roster() {
    }

    public Roster(String id, User user, List<LocalDate> generalShift, List<LocalDate> morningShift, List<LocalDate> eveningShift, List<LocalDate> weekOffs, List<LocalDate> holidays) {
        this.id = id;
        this.user = user;
        this.generalShift = generalShift;
        this.morningShift = morningShift;
        this.eveningShift = eveningShift;
        this.weekOffs = weekOffs;
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

    public List<LocalDate> getGeneralShift() {
        return generalShift;
    }

    public void setGeneralShift(List<LocalDate> generalShift) {
        this.generalShift = generalShift;
    }

    public List<LocalDate> getMorningShift() {
        return morningShift;
    }

    public void setMorningShift(List<LocalDate> morningShift) {
        this.morningShift = morningShift;
    }

    public List<LocalDate> getEveningShift() {
        return eveningShift;
    }

    public void setEveningShift(List<LocalDate> eveningShift) {
        this.eveningShift = eveningShift;
    }

    public List<LocalDate> getWeekOffs() {
        return weekOffs;
    }

    public void setWeekOffs(List<LocalDate> weekOffs) {
        this.weekOffs = weekOffs;
    }

    public List<LocalDate> getHolidays() {
        return holidays;
    }

    public void setHolidays(List<LocalDate> holidays) {
        this.holidays = holidays;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(int month,int year) {
        this.monthYear = YearMonth.of(year,month).toString();
    }

    public void setMonthYear(YearMonth monthYear) {
        this.monthYear = monthYear.toString();
    }

    @Override
    public String toString() {
        return "Roster{" +
                "id='" + id + '\'' +
                ", user=" + user +
//                ", monthYear=" + monthYear +
                ", generalShift=" + generalShift +
                ", morningShift=" + morningShift +
                ", nightShift=" + eveningShift +
                ", weekoffs=" + weekOffs +
                ", holidays=" + holidays +
                '}';
    }
}