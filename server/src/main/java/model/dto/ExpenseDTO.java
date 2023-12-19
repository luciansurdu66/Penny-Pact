package model.dto;

import java.time.LocalDate;

public class ExpenseDTO {
    private int id;
    private UserDTO userDTO;
    private double amount;
    private LocalDate date;

    public ExpenseDTO(int id, UserDTO userDTO, double amount, LocalDate date) {
        this.id = id;
        this.userDTO = userDTO;
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

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
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
}
