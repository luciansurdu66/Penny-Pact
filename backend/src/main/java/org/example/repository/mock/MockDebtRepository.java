package org.example.repository.mock;

import org.example.exception.DuplicatedEntityException;
import org.example.exception.EntityNotFoundException;
import org.example.model.Debt;
import org.example.repository.DebtRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@Qualifier("mockDebtRepository")
public class MockDebtRepository implements DebtRepository {

    Map<Integer, Debt> debts;

    public MockDebtRepository() {
        debts = new HashMap<>(Map.of(
                1, new Debt(1, 1, 3, 2, 50.51),
                2, new Debt(2, 1, 2, 1, 41.10)
        ));
    }

    // Overrides

    @Override
    public Debt save(Debt debt) throws DuplicatedEntityException {
        if (debts.containsKey(debt.getId())) {
            throw new DuplicatedEntityException();
        }

        debts.put(debt.getId(), debt);

        return debt;
    }

    @Override
    public Debt findById(Integer id) {
        return debts.get(id);
    }

    @Override
    public List<Debt> findByGroupId(int groupId) {
        return debts.values()
            .stream()
            .filter(debt -> debt.getGroupId() == groupId)
            .toList();
    }

    @Override
    public Iterable<Debt> findAll() {
        return debts.values();
    }

    @Override
    public void update(Debt modifiedDebt) throws EntityNotFoundException {
        Debt oldDebt = debts.get(modifiedDebt.getId());

        if (oldDebt == null) {
            throw new EntityNotFoundException();
        }

        debts.put(oldDebt.getId(), modifiedDebt);
    }

    @Override
    public Debt remove(Integer id) throws EntityNotFoundException {
        if (!debts.containsKey(id)) {
            throw new EntityNotFoundException();
        }

        return debts.remove(id);
    }

    @Override
    public int size() {
        return debts.size();
    }
}
