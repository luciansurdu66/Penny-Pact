package org.example.repository.mock;

import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.Payment;
import org.example.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@Qualifier("mockPaymentRepository")
public class MockPaymentRepository implements PaymentRepository {

    Map<Integer, Payment> expenses;

    public MockPaymentRepository() {
        expenses = new HashMap<>(Map.of(
               1, new Payment(
                       1,
                        1,
                        "Lidl",
                        1,
                        376.50,
                        LocalDate.of(2023, 12, 10)),
                2, new Payment(
                        2,
                        1,
                        "Factura E.ON",
                        2,
                        488.10,
                        LocalDate.of(2023, 12, 2)
                ),
                3, new Payment(
                        3,
                        1,
                        "Electrica",
                        3,
                        8.50,
                        LocalDate.of(2023, 11, 29)
                )
        ));
    }

    // Overrides

    @Override
    public Payment save(Payment expense) throws DuplicatedEntityException {
        if (expenses.containsKey(expense.getId())) {
            throw new DuplicatedEntityException();
        }

        expenses.put(expense.getId(), expense);

        return expense;
    }

    @Override
    public Payment findById(Integer id) {
        return expenses.get(id);
    }

    @Override
    public Iterable<Payment> findAll() {
        return expenses.values();
    }

    @Override
    public void update(Payment modifiedExpense) throws EntityNotFoundException {
        Payment oldExpense = expenses.get(modifiedExpense.getId());

        if (oldExpense == null) {
            throw new EntityNotFoundException();
        }

        expenses.put(oldExpense.getId(), modifiedExpense);
    }

    @Override
    public Payment remove(Integer id) throws EntityNotFoundException {
        if (!expenses.containsKey(id)) {
            throw new EntityNotFoundException();
        }

        return expenses.remove(id);
    }

    @Override
    public List<Payment> getAllByGroup(int groupId) {
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
