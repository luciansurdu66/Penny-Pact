package org.example.dto;

import java.time.LocalDate;

public class PaymentDto {

    private int id;
    private String name,
        user;
    private LocalDate date;
    private double amount;

    public PaymentDto(int id, String name, String user, LocalDate date, double amount) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.date = date;
        this.amount = amount;
    }

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
