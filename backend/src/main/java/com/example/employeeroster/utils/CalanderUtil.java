package com.example.employeeroster.utils;

import com.example.employeeroster.model.Shift;
import com.example.employeeroster.model.WeekOff;
import org.springframework.cglib.core.Local;

import java.sql.SQLOutput;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CalanderUtil {
    public static int getMonthLength(int month,int year){
        return LocalDate.of(year,month,1).lengthOfMonth();
    }

    public static List<LocalDate> getListOfDatesOfMonthAndYear(int month, int year){
        int numOfDays = getMonthLength(month,year);
        List<LocalDate> days = new ArrayList<>();
        LocalDate date = LocalDate.of(year,month,1);
        while (date.getMonthValue()==month){
            days.add(date);
            date = date.plusDays(1);
        }
        System.out.println(days);
        return days;
    }

    public static List<LocalDate> getWeekEndDates(int month, int year, WeekOff weekOffs){
        List<LocalDate> weekends = new ArrayList<>();
        Map<String, DayOfWeek> weekOff = getWeekEndsByWeekOff(weekOffs);
        LocalDate firstDateOfMonth = LocalDate.of(year,month,1);
        LocalDate lastDateOfMonth = firstDateOfMonth.with(TemporalAdjusters.lastDayOfMonth());
        LocalDate date = firstDateOfMonth;
        while (!date.isAfter(lastDateOfMonth)){
            if(date.getDayOfWeek()==weekOff.get("firstOff") ||date.getDayOfWeek()==weekOff.get("secondOff") ){
                weekends.add(date);
            }
            date = date.plusDays(1);
        }
        System.out.println(weekends);
        return weekends;
    }

    public static LocalDate formatDate(LocalDate date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return LocalDate.parse(formatter.format(date),formatter);
    }

    private static Map<String, DayOfWeek> getWeekEndsByWeekOff(WeekOff weekOff){
        Map<String, DayOfWeek> weekOffs = new HashMap<>();
        if(weekOff == WeekOff.FRISAT){
            weekOffs.put("firstOff",DayOfWeek.FRIDAY);
            weekOffs.put("secondOff",DayOfWeek.SATURDAY);
        }
        else {
            weekOffs.put("firstOff",DayOfWeek.SUNDAY);
            weekOffs.put("secondOff",DayOfWeek.MONDAY);
        }
        return weekOffs;
    }

    public static String getMonthYearInString(int month,int year) {
        return YearMonth.of(year,month).toString();
    }

}
