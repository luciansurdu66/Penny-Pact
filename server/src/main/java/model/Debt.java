package model;

public class Debt {
    private int id,
            groupId,
            debtorId,
            creditorId;
    private double amount;

    public Debt(int id, int groupId, int debtorId, int creditorId, double amount) {
        this.id = id;
        this.groupId = groupId;
        this.debtorId = debtorId;
        this.creditorId = creditorId;
        this.amount = amount;
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

    public int getDebtorId() {
        return debtorId;
    }

    public void setDebtorId(int debtorId) {
        this.debtorId = debtorId;
    }

    public int getCreditorId() {
        return creditorId;
    }

    public void setCreditorId(int creditorId) {
        this.creditorId = creditorId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
