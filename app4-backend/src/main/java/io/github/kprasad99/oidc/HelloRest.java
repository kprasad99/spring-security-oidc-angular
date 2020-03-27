package io.github.kprasad99.oidc;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloRest {

	@PreAuthorize("hasRole('APP1_ADMIN")
	@GetMapping("/admin")
	public String admin(OAuth2AuthenticationToken token) {
		return "Hello from admin of APP4";
	}
}
