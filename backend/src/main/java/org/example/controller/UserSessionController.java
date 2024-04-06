package org.example.controller;

import org.example.dto.DebtDto;
import org.example.dto.PaymentDto;
import org.example.mapper.Mapper;
import org.example.model.Group;
import org.example.model.User;
import org.example.request.CreateGroupRequest;
import org.example.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserSessionController {

    private final UserGroupService userGroupService;
    private final PaymentService paymentService;
    private final TokenService tokenService;
    private final GroupService groupService;
    private final UserService userService;
    private final DebtService debtService;
    private final Mapper mapper;
    private final Logger logger;

    public UserSessionController(
        UserGroupService userGroupService,
        PaymentService paymentService,
        GroupService groupService,
        TokenService tokenService,
        UserService userService,
        DebtService debtService,
        Mapper mapper
    ) {
        this.logger = LoggerFactory.getLogger(UserSessionController.class);
        this.userGroupService = userGroupService;
        this.paymentService = paymentService;
        this.tokenService = tokenService;
        this.groupService = groupService;
        this.userService = userService;
        this.debtService = debtService;
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

            logger.info("Get all groups for user {}", user.getId());

            response = ResponseEntity.ok(
                groupService.getGroupsByIds(userGroupIds)
                    .stream().map(mapper::toGroupDto)
            );
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

            logger.info("User {} requested group {} payments", user.getId(), groupId);

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

    @PostMapping("group/new")
    public ResponseEntity<?> addNewGroup(
        @RequestHeader("Authorization") String token,
        @RequestBody CreateGroupRequest request
    ) {
        ResponseEntity<?> response;
        String groupName = request.getGroupName();

        if (groupName == null || groupName.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new Object() {
                    public String error = "groupName field was not provided or it was empty";
                });
        }

        try {
            String userEmail = tokenService.getTokenSubject(token);
            User user = userService.getByEmail(userEmail);
            int _newGroupId = groupService.createGroup(groupName, user.getId());

            logger.info("User {} requested a new group with the name '{}'", user.getId(), groupName);

            userGroupService.addUserGroupPair(user.getId(), _newGroupId);
            response = ResponseEntity.ok(new Object() {
                public int newGroupId = _newGroupId;
            });
        } catch (JwtException ignored) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return response;
    }

    @DeleteMapping("/group/{groupId}/delete")
    public ResponseEntity<?> deleteGroup(
        @RequestHeader("Authorization") String token,
        @PathVariable int groupId
    ) {
        ResponseEntity<?> response;

        try {
            String userEmail = tokenService.getTokenSubject(token);
            User user = userService.getByEmail(userEmail);
            Group groupToBeDeleted = groupService.getGroupById(groupId);

            logger.info("User {} requested the deletion of group {}", user.getId(), groupId);

            // The group does not exist or the user requesting the
            // deletion did not create the group.
            if (groupToBeDeleted == null ||
                groupToBeDeleted.getCreatorId() != user.getId()) {

                throw new JwtException("");
            }

            groupService.deleteGroupById(groupId);
            userGroupService.removeUserGroupPairsHavingGroupId(groupId);

            response = ResponseEntity.ok()
                .build();
        } catch (JwtException ignored) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .build();
        }

        return response;
    }
}
