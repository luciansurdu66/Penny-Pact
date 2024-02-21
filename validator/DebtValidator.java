package org.example.validator;

import org.example.exception.ValidatorException;
import org.example.model.Debt;
import org.example.model.User;

public class DebtValidator implements Validator<Debt> {
    @Override
    public void validate(Debt debt) throws ValidatorException {
        validateGroupId(debt.getGroupId());
        validateId(debt.getId());
        validateDebtId(debt.getDebtorId());
        validateCreditorId(debt.getCreditorId());
        validateAmount(debt.getAmount());
    }

    private void validateGroupId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid group id");
        }
    }
    private void validateId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid group id");
        }
    }
    private void validateDebtId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid group id");
        }
    }
    private void validateCreditorId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid group id");
        }
    }
    private void validateAmount(double id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid group id");
        }
    }


}