package Attendence.SIH.Attendence.SIH.dto;

public class AuthDtos {
    public static class LoginRequestDto {
        public String email;
        public String password;
    }
    public static class JwtResponseDto {
        public String token;
        public UserDto user;
        public JwtResponseDto(String token, UserDto user) {
            this.token = token;
            this.user = user;
        }
    }
    public static class UserRegistrationDto {
        public String username;
        public String email;
        public String password;
        public String role;
    }
    public static class UserDto {
        public Long id;
        public String username;
        public String email;
        public String role;
        public UserDto() {}
        public UserDto(Long id, String username, String email, String role) {
            this.id = id; this.username = username; this.email = email; this.role = role;
        }
    }
}
