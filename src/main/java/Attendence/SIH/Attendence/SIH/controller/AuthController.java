package Attendence.SIH.Attendence.SIH.controller;

import Attendence.SIH.Attendence.SIH.dto.AuthDtos.JwtResponseDto;
import Attendence.SIH.Attendence.SIH.dto.AuthDtos.LoginRequestDto;
import Attendence.SIH.Attendence.SIH.dto.AuthDtos.UserDto;
import Attendence.SIH.Attendence.SIH.dto.AuthDtos.UserRegistrationDto;
import Attendence.SIH.Attendence.SIH.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserRegistrationDto dto) {
        try {
            UserDto saved = userService.register(dto);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@RequestBody LoginRequestDto req) {
        Optional<UserDto> userOpt = userService.findByEmail(req.email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }
        // TODO: verify password when we store encoded passwords; for now accept any
        String token = "dev-token-" + UUID.randomUUID();
        return ResponseEntity.ok(new JwtResponseDto(token, userOpt.get()));
    }
}

