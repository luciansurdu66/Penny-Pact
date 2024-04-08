package org.example.request;

public class AddFriendRequest {

    public int requestedUserId;

    // Overrides

    @Override
    public String toString() {
        return "AddFriendRequest{" +
            "requestedUserId=" + requestedUserId +
            '}';
    }
}
