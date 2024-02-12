package org.example.controller;

import org.example.model.Debt;
import org.example.model.Payment;
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

    public UserSessionController(
        TokenService tokenService,
        UserService userService,
        GroupService groupService,
        PaymentService paymentService,
        DebtService debtService,
        UserGroupService userGroupService
    ) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.groupService = groupService;
        this.paymentService = paymentService;
        this.debtService = debtService;
        this.userGroupService = userGroupService;
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

            Iterable<Payment> groupPayments = paymentService.retrieveAllByGroup(groupId);

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

            Iterable<Debt> groupDebts = debtService.getByGroupId(groupId);
            response = ResponseEntity.ok(groupDebts);
        } catch (JwtException ignored) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return response;
    }
}
