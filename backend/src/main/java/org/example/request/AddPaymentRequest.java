package org.example.request;

import java.time.LocalDate;

public class AddPaymentRequest {

    private String name;
    private LocalDate date;
    private double amount;

    // Overrides

    @Override
    public String toString() {
        return "AddPaymentRequest{" +
            "name='" + name + '\'' +
            ", date=" + date +
            ", amount=" + amount +
            '}';
    }

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
