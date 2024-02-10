package org.example.repository.mock;

import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.Expense;
import org.example.repository.ExpenseRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class MockExpenseRepository implements ExpenseRepository {

    Map<Integer, Expense> expenses;

    public MockExpenseRepository() {
        expenses = new HashMap<>(Map.of(
               1, new Expense(
                       1,
                        "Lidl",
                        1,
                        376.50,
                        LocalDate.of(2023, 12, 10)),
                2, new Expense(
                        2,
                        "Factura E.ON",
                        2,
                        488.10,
                        LocalDate.of(2023, 12, 2)
                ),
                3, new Expense(
                        3,
                        "Electrica",
                        3,
                        8.50,
                        LocalDate.of(2023, 11, 29)
                )
        ));
    }

    // Overrides.

    @Override
    public Expense save(Expense expense) throws DuplicatedEntityException {
        if (expenses.containsKey(expense.getId())) {
            throw new DuplicatedEntityException();
        }

        expenses.put(expense.getId(), expense);

        return expense;
    }

    @Override
    public Expense findById(Integer id) {
        return expenses.get(id);
    }

    @Override
    public Iterable<Expense> findAll() {
        return expenses.values();
    }

    @Override
    public void update(Expense modifiedExpense) throws EntityNotFoundException {
        Expense oldExpense = expenses.get(modifiedExpense.getId());

        if (oldExpense == null) {
            throw new EntityNotFoundException();
        }

        expenses.put(oldExpense.getId(), modifiedExpense);
    }

    @Override
    public Expense remove(Integer id) throws EntityNotFoundException {
        if (!expenses.containsKey(id)) {
            throw new EntityNotFoundException();
        }

        return expenses.remove(id);
    }

    @Override
    public Iterable<Expense> getAllByGroup(int groupId) {
        return expenses.values()
                .stream()
                .filter((e) -> e.getGroupId() == groupId)
                .toList();
    }

    @Override
    public int size() {
        return expenses.size();
    }
}
