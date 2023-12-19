package repository.mock;

import exception.DuplicatedEntityException;
import exception.EntityNotFoundException;
import model.Debt;
import repository.DebtRepository;

import java.util.HashMap;
import java.util.Map;

public class MockDebtRepository implements DebtRepository {
    Map<Integer, Debt> debts;

    public MockDebtRepository() {
        debts = new HashMap<>(Map.of(
                1, new Debt(1, 1, 3, 2, 50.51),
                2, new Debt(2, 1, 2, 1, 41.10)
        ));
    }

    // Overrides.

    @Override
    public void save(Debt debt) throws DuplicatedEntityException {
        if (debts.containsKey(debt.getId())) {
            throw new DuplicatedEntityException();
        }

        debts.put(debt.getId(), debt);
    }

    @Override
    public Debt findById(Integer id) {
        return debts.get(id);
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
}
