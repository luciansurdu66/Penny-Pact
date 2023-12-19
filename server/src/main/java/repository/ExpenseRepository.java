package repository;

import model.Expense;

public interface ExpenseRepository extends Repository<Expense, Integer> {
    Iterable<Expense> getAllByGroup(int groupId);
}
