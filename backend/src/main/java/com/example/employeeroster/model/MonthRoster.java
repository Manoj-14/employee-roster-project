package com.example.employeeroster.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class MonthRoster {
    @Id
    private String id;
    @Indexed(unique = true)
    private String monthYear;
    @DBRef
    private List<Roster> rosters = new ArrayList<>();

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
        return "MonthRoster{" +
                "id='" + id + '\'' +
                ", monthYear='" + monthYear + '\'' +
                ", rosters=" + rosters +
                '}';
    }
}
