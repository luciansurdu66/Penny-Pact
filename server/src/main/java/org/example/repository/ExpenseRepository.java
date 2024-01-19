package org.example.repository;

import org.example.model.Expense;

public interface ExpenseRepository extends Repository<Expense, Integer> {

    Iterable<Expense> getAllByGroup(int groupId);
}
