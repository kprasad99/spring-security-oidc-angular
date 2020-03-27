package io.github.kprasad99.oidc;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@Slf4j
public class HelloRest {

	@PreAuthorize("hasRole('APP1_ADMIN')")
	@GetMapping("/admin")
	public Mono<String> admin(JwtAuthenticationToken auth) {
		log.info("{}", auth.getAuthorities());
		return Mono.just("Hello from admin of APP1");
	}
	
	@PreAuthorize("hasRole('APP1_USER')")
	@GetMapping("/user")
	public Mono<String> user() {
		return Mono.just("Hello from user of APP1");
	}
}
