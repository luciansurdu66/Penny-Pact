package org.example.service;

import org.example.model.Debt;
import org.example.repository.DebtRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebtService {

    private final DebtRepository debtRepository;

    public DebtService(
        @Qualifier("mockDebtRepository") DebtRepository debtRepository
    ) {
        this.debtRepository = debtRepository;
    }

    public List<Debt> getByGroupId(int groupId) {
        return debtRepository.findByGroupId(groupId);
    }
}
