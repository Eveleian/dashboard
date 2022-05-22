package com.dashboard.dashboard.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.dashboard.dashboard.ResourceNotFoundException;
import com.dashboard.dashboard.UserRepository;
import com.dashboard.dashboard.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;
        
    @GetMapping
    public List<User> findAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable(value = "id") long id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("google/{id}")
    public ResponseEntity<User> getUserByIdGoogle(@PathVariable(value = "id") String id) {
        
        List<User> allUser = findAllUsers();
       
        for(User user : allUser) {
            if(user.getIdGoogle() != null && user.getIdGoogle().equals(id)){
                return ResponseEntity.ok().body(user);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/login/google/{id}")
    public String findUserByIdGoogle(@PathVariable(value = "id") String id) {

        List<User> allUser = findAllUsers();
       
        for(User user : allUser) {
            if(user.getIdGoogle() != null && user.getIdGoogle().equals(id)){
                return "true";
            }
        }
        return "false";
    }

    @PostMapping
    public User saveUser(@Validated @RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@Validated @RequestBody User UserRessu) {
        List<User> allUser = findAllUsers();
        for(User user : allUser) {
            if(user.getEmail().equals(UserRessu.getEmail()) && user.getPassword().equals(UserRessu.getPassword())) {
                return ResponseEntity.ok().body(user);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable(value = "id") long id, @Validated @RequestBody User userDetails)
        throws ResourceNotFoundException  {

        User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + id));

        if(userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
        }
        if(userDetails.getPseudo() != null) {
            user.setPseudo(userDetails.getPseudo());
        }
        if(userDetails.getPassword() != null) {
            user.setPassword(userDetails.getPassword());
        }
        if(userDetails.getWidget() != null) {
            user.setWidget(userDetails.getWidget());
        }
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") long id) throws Exception {
        User user =
            userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}