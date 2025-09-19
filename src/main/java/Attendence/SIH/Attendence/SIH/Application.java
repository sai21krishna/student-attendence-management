package Attendence.SIH.Attendence.SIH;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import Attendence.SIH.Attendence.SIH.service.UserService;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner initUsers(UserService userService) {
		return args -> userService.seedAdminIfMissing();
	}

}
