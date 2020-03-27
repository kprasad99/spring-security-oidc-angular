package io.github.kprasad99.oidc;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class KeycloakJwtAutheticationConverter extends JwtAuthenticationConverter {

	@Override
	protected Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
		log.info("{}", jwt.getClaims());
		@SuppressWarnings("deprecation")
		Collection<GrantedAuthority> authorities = super.extractAuthorities(jwt);
        List<String> resourceAccess = jwt.getClaimAsStringList("authorities");
        Optional.ofNullable(resourceAccess).orElse(Collections.emptyList()).stream().map(SimpleGrantedAuthority::new).forEach(authorities::add);
        return authorities;
	}
}
