package com.example.backend.controller;

import com.example.backend.model.Expense;
import com.example.backend.model.User;
import com.example.backend.repository.ExpenseRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import com.example.backend.util.JwtUtil;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllExpenses(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String username = extractUsernameFromHeader(authHeader);
        if (username == null)
            return ResponseEntity.status(403).build();
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(u -> ResponseEntity.ok(expenseRepository.findByUser(u)))
                .orElse(ResponseEntity.status(403).build());
    }

    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Expense expense,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String username = extractUsernameFromHeader(authHeader);
        if (username == null)
            return ResponseEntity.status(403).build();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(403).build();
        }
        expense.setUser(user.get());
        return ResponseEntity.ok(expenseRepository.save(expense));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String username = extractUsernameFromHeader(authHeader);
        if (username == null)
            return ResponseEntity.status(403).build();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(403).build();
        }
        Optional<Expense> existingExpense = expenseRepository.findById(id);
        if (existingExpense.isPresent() && existingExpense.get().getUser().getId().equals(user.get().getId())) {
            Expense expenseToUpdate = existingExpense.get();
            expenseToUpdate.setDescription(updatedExpense.getDescription());
            expenseToUpdate.setAmount(updatedExpense.getAmount());
            expenseToUpdate.setDate(updatedExpense.getDate());
            return ResponseEntity.ok(expenseRepository.save(expenseToUpdate));
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String username = extractUsernameFromHeader(authHeader);
        if (username == null)
            return ResponseEntity.status(403).build();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(403).build();
        }
        Optional<Expense> existingExpense = expenseRepository.findById(id);
        if (existingExpense.isPresent() && existingExpense.get().getUser().getId().equals(user.get().getId())) {
            expenseRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    private String extractUsernameFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return null;
        String token = authHeader.substring(7);
        try {
            return JwtUtil.extractUsername(token);
        } catch (Exception e) {
            return null;
        }
    }
}
