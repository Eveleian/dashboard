package com.dashboard.dashboard.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String email;
    private String pseudo;
    private String password;
    private String widget;
    private String idGoogle;

    public long getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getPseudo() {
        return pseudo;
    }
    public String getIdGoogle(){
        return idGoogle;
    }
    public String getWidget() {
        return widget;
    }
    public void setId(long id) {
        this.id = id;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }
    public void setIdGoogle(String idGoogle){
        this.idGoogle = idGoogle;
    }
    public void setWidget(String widget) {
        this.widget = widget;
    }
}
