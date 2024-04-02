package org.example.mapper;

import org.example.dto.DebtDto;
import org.example.dto.PaymentDto;
import org.example.dto.UserDto;
import org.example.model.Debt;
import org.example.model.Payment;
import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class Mapper {

    private final UserService userService;

    public Mapper(UserService userService) {
        this.userService = userService;
    }

    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }

        int id = user.getId();
        String username = user.getUsername(),
                email = user.getEmail();

        return new UserDto(id, username, email);
    }

    public PaymentDto toPaymentDto(Payment payment) {
        if (payment == null) {
            return null;
        }

        return new PaymentDto(
            payment.getId(),
            payment.getName(),
            userService.getById(payment.getUserId()).getUsername(),
            payment.getDate(),
            payment.getAmount()
        );
    }

    public DebtDto toDebtDto(Debt debt) {
        if (debt == null) {
            return null;
        }

        return new DebtDto(
            debt.getId(),
            userService.getById(debt.getDebtorId()).getUsername(),
            userService.getById(debt.getCreditorId()).getUsername(),
            debt.getAmount()
        );
    }
}
