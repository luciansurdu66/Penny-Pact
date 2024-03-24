package org.example.repository;

import org.example.model.Debt;

import java.util.List;

public interface DebtRepository extends Repository<Debt, Integer> {

    /**
     * Retrieves the debts for a given group.
     * @param groupId The id of the group.
     * @return The debts for the given group.
     */
    List<Debt> findByGroupId(int groupId);
}
