package org.example.controller;

import org.example.dto.DebtDto;
import org.example.dto.PaymentDto;
import org.example.model.Debt;
import org.example.mapper.Mapper;
import org.example.model.User;
import org.example.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserSessionController {

    private final TokenService tokenService;
    private final UserService userService;
    private final GroupService groupService;
    private final PaymentService paymentService;
    private final DebtService debtService;
    private final UserGroupService userGroupService;
    private final Mapper mapper;

    public UserSessionController(
        TokenService tokenService,
        UserService userService,
        GroupService groupService,
        PaymentService paymentService,
        DebtService debtService,
        UserGroupService userGroupService,
        Mapper mapper
    ) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.groupService = groupService;
        this.paymentService = paymentService;
        this.debtService = debtService;
        this.userGroupService = userGroupService;
        this.mapper = mapper;
    }

    @GetMapping("/groups")
    public ResponseEntity<?> getGroupsByUser(
        @RequestHeader("Authorization") String token
    ) {
        ResponseEntity<?> response;

        try {
            String userEmail = tokenService.getTokenSubject(token);
            User user = userService.getByEmail(userEmail);
            List<Integer> userGroupIds = userGroupService.getGroupIdsByUserId(user.getId());

            response = ResponseEntity.ok(groupService.getGroupsByIds(userGroupIds));
        } catch (JwtException ignored) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return response;
    }

    @GetMapping("/group/{groupId}/payments")
    public ResponseEntity<?> getGroupPayments(
        @RequestHeader("Authorization") String token,
        @PathVariable("groupId") int groupId
    ) {
        ResponseEntity<?> response;

        try {
            String userEmail = tokenService.getTokenSubject(token);
            User user = userService.getByEmail(userEmail);

            // Checking if the user is authorized.

            if (user == null ||
                !userGroupService.hasUserGroupKeyPair(user.getId(), groupId)) {
                // The user is not authorized.

                throw new JwtException("");
            }

            // The user is authorized.

            Iterable<PaymentDto> groupPayments = paymentService.retrieveAllByGroup(groupId)
                .stream()
                .map(mapper::toPaymentDto)
                .toList();

            response = ResponseEntity.ok(groupPayments);
        } catch (JwtException ignored) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return response;
    }

    @GetMapping("group/{groupId}/debts")
    public ResponseEntity<?> getGroupDebts(
        @RequestHeader("Authorization") String token,
        @PathVariable("groupId") int groupId
    ) {
        ResponseEntity<?> response;

        try {
            String userEmail = tokenService.getTokenSubject(token);
            User user = userService.getByEmail(userEmail);

            // Checking if the user is authorized.

            if (user == null ||
                !userGroupService.hasUserGroupKeyPair(user.getId(), groupId)) {
                // The user is not authorized.

                throw new JwtException("");
            }

            // The user is authorized.

            Iterable<DebtDto> groupDebts = debtService.getByGroupId(groupId)
                .stream()
                .map(debt -> {
                    DebtDto debtDto = mapper.toDebtDto(debt);

                    if (debt.getCreditorId() == user.getId()) {     // User is debtor.
                        debtDto.setCreditor("You");
                    }

                    if (debt.getDebtorId() == user.getId()) {       // User is creditor.
                        debtDto.setDebtor("You");
                    }

                    return debtDto;
                })
                .toList();

            response = ResponseEntity.ok(groupDebts);
        } catch (JwtException ignored) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return response;
    }
}
