package org.example.model;

import java.time.LocalDate;

public class Expense {

    private int id,
            groupId,
            userId;
    private double amount;
    private LocalDate date;
    private String name;

    public Expense(int id, String name, int userId, double amount, LocalDate date) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.amount = amount;
        this.date = date;
    }

    // Getters and Setters.

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
