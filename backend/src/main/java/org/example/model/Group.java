package org.example.model;

public class Group {

    private int id;
    private int creatorId;
    private String name;

    public Group(int id, int creatorId, String name) {
        this.id = id;
        this.name = name;
        this.creatorId = creatorId;
    }

    // Getters and setters.

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
