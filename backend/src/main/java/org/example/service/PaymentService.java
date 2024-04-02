package org.example.service;

import org.example.dto.PaymentDto;
import org.example.model.Payment;
import org.example.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    PaymentRepository paymentRepository;

    public PaymentService(
        @Qualifier("mockPaymentRepository") PaymentRepository _expenseRepository
    ) {
        paymentRepository = _expenseRepository;
    }


    public void saveExpense(Payment expense) {
        paymentRepository.save(expense);
    }

    public void removeExpense(Integer id) {
        paymentRepository.remove(id);
    }

    public void updateExpense(Payment expense) {
        paymentRepository.update(expense);
    }

    public Iterable<Payment> getAll() {
        return paymentRepository.findAll();
    }

    public List<Payment> retrieveAllByGroup(int groupID) {
        return paymentRepository.getAllByGroup(groupID);
    }

    public Payment getById(Integer id) {
        return paymentRepository.findById(id);
    }
}
