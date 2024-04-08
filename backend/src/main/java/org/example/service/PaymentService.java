package org.example.service;

import org.example.dto.PaymentDto;
import org.example.model.Payment;
import org.example.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {

    PaymentRepository paymentRepository;

    public PaymentService(
        @Qualifier("mockPaymentRepository") PaymentRepository _expenseRepository
    ) {
        paymentRepository = _expenseRepository;
    }

    public void createPayment(String name, LocalDate date, double amount, int groupId, int userId) {
        int newPaymentId = generateUniqueId();
        Payment newPayment = new Payment(
            newPaymentId,
            groupId,
            name,
            userId,
            amount,
            date
        );

        paymentRepository.save(newPayment);
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

    private int generateUniqueId() {
        int id = 0;

        for (Payment payment : paymentRepository.findAll()) {
            id = Math.max(id, payment.getId());
        }

        return ++id;
    }
}
