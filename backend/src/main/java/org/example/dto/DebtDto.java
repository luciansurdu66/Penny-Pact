package org.example.dto;

public class DebtDto {

    private int id;
    private String debtor,
        creditor;
    private double amount;

    public DebtDto(int id, String debtor, String creditor, double amount) {
        this.id = id;
        this.debtor = debtor;
        this.creditor = creditor;
        this.amount = amount;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDebtor() {
        return debtor;
    }

    public void setDebtor(String debtor) {
        this.debtor = debtor;
    }

    public String getCreditor() {
        return creditor;
    }

    public void setCreditor(String creditor) {
        this.creditor = creditor;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
