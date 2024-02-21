package org.example.validator;

import org.example.exception.ValidatorException;
import org.example.model.Expense;
import org.example.model.User;

import java.time.LocalDate;

public class ExpenseValidator implements Validator<Expense> {
    @Override
    public void validate(Expense expense) throws ValidatorException {
        validateUserId(expense.getUserId());
        validateGroupId(expense.getGroupId());
        validateDate(expense.getDate());
        validateAmount(expense.getAmount());
        validateStringFieldNotBlank(
                expense.getName()
                //expense.getDate(),
                //expense.getAmount()
        );
    }

    /**
     * Validates the id of a user.
     * @param id The id of the user.
     * @throws ValidatorException The id is invalid.
     */
    private void validateUserId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid user id");
        }
    }

    private void validateGroupId(int id) throws ValidatorException {
        if (id <= 0) {
            throw new ValidatorException("Invalid group id");
        }
    }
    private void validateDate(LocalDate date) throws ValidatorException {
        if (date == null) {
            throw new ValidatorException("Invalid date id");
        }
    }
    private void validateAmount(double amount) throws ValidatorException {
        if (amount <= 0) {
            throw new ValidatorException("Invalid user id");
        }
    }
    /**
     * Validates that a user string field (e.g., username) is not blank.
     * @param fields The validated field.
     * @throws ValidatorException The field is blank.
     */
    private void validateStringFieldNotBlank(
            String... fields
    ) throws ValidatorException {
        for (String field : fields) {
            if (field.isBlank()) {
                throw new ValidatorException("Blank user field");
            }
        }
    }
}
