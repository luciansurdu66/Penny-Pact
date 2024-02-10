package org.example.service;

import org.example.model.Expense;
import org.example.repository.ExpenseRepository;

public class ExpenseService {

    ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository _expenseRepository) {
        expenseRepository = _expenseRepository;
    }


    public void saveExpense(Expense expense) {
        expenseRepository.save(expense);
    }

    public void removeExpense(Integer id) {
        expenseRepository.remove(id);
    }

    public void updateExpense(Expense expense) {
        expenseRepository.update(expense);
    }

    public Iterable<Expense> getAll() {
        return expenseRepository.findAll();
    }

    public Iterable<Expense> retrieveAllByGroup(int groupID) {
        return expenseRepository.getAllByGroup(groupID);
    }

    public Expense getById(Integer id) {
        return expenseRepository.findById(id);
    }
}
