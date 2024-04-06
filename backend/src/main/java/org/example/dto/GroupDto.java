package org.example.dto;

public class GroupDto {

    private int id;
    private String creator;
    private String name;

    public GroupDto(int id, String creator, String name) {
        this.id = id;
        this.creator = creator;
        this.name = name;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
