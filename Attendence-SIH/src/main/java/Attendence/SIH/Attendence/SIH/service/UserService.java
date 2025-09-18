package Attendence.SIH.Attendence.SIH.service;

import Attendence.SIH.Attendence.SIH.dto.AuthDtos.UserDto;
import Attendence.SIH.Attendence.SIH.dto.AuthDtos.UserRegistrationDto;
import Attendence.SIH.Attendence.SIH.entity.User;
import Attendence.SIH.Attendence.SIH.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> findById(Long id) {
        return userRepository.findById(id).map(this::toDto);
    }

    public Optional<UserDto> findByEmail(String email) {
        return userRepository.findByEmail(email).map(this::toDto);
    }

    public UserDto register(UserRegistrationDto dto) {
        // basic duplicate check
        userRepository.findByEmail(dto.email).ifPresent(u -> {
            throw new IllegalArgumentException("Email already registered");
        });
        User u = new User();
        u.setUsername(dto.username);
        u.setEmail(dto.email);
        u.setRole(dto.role == null ? "EMPLOYEE" : dto.role);
        u.setPassword(dto.password); // to be encoded when real auth is added
        User saved = userRepository.save(u);
        return toDto(saved);
    }

    public UserDto save(UserDto dto) {
        User u = new User();
        u.setId(dto.id);
        u.setUsername(dto.username);
        u.setEmail(dto.email);
        u.setRole(dto.role);
        User saved = userRepository.save(u);
        return toDto(saved);
    }

    public boolean deleteById(Long id) {
        if (!userRepository.existsById(id)) return false;
        userRepository.deleteById(id);
        return true;
    }

    public void seedAdminIfMissing() {
        userRepository.findByEmail("admin@example.com").orElseGet(() -> {
            User admin = new User();
            admin.setUsername("Admin");
            admin.setEmail("admin@example.com");
            admin.setRole("ADMIN");
            admin.setPassword(null);
            return userRepository.save(admin);
        });
    }

    private UserDto toDto(User u) {
        return new UserDto(u.getId(), u.getUsername(), u.getEmail(), u.getRole());
    }
}
