package io.github.kprasad99.oidc;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class HelloRest {

	@PreAuthorize("hasRole('APP3_ADMIN')")
	@GetMapping("/admin")
	public String admin(JwtAuthenticationToken auth) {
		log.info("{}", auth.getAuthorities());
		return "Hello from admin of APP3";
	}
	
	@PreAuthorize("hasRole('APP3_USER')")
	@GetMapping("/user")
	public String user() {
		return "Hello from user of APP3";
	}
}
