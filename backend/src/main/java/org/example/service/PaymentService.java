package org.example.service;

import org.example.model.Payment;
import org.example.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    PaymentRepository expenseRepository;

    public PaymentService(
        @Qualifier("mockPaymentRepository") PaymentRepository _expenseRepository
    ) {
        expenseRepository = _expenseRepository;
    }


    public void saveExpense(Payment expense) {
        expenseRepository.save(expense);
    }

    public void removeExpense(Integer id) {
        expenseRepository.remove(id);
    }

    public void updateExpense(Payment expense) {
        expenseRepository.update(expense);
    }

    public Iterable<Payment> getAll() {
        return expenseRepository.findAll();
    }

    public Iterable<Payment> retrieveAllByGroup(int groupID) {
        return expenseRepository.getAllByGroup(groupID);
    }

    public Payment getById(Integer id) {
        return expenseRepository.findById(id);
    }
}
