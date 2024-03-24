package org.example.repository;

import org.example.model.Payment;

import java.util.List;

public interface PaymentRepository extends Repository<Payment, Integer> {

    List<Payment> getAllByGroup(int groupId);
}
