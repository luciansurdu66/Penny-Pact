package org.example.repository;

import org.example.model.Payment;

public interface PaymentRepository extends Repository<Payment, Integer> {

    Iterable<Payment> getAllByGroup(int groupId);
}
