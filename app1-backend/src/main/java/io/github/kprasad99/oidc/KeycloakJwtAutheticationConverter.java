package io.github.kprasad99.oidc;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class KeycloakJwtAutheticationConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

	@Override
	public Collection<GrantedAuthority> convert(Jwt source) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		List<String> resourceAccess = source.getClaimAsStringList("authorities");
        Optional.ofNullable(resourceAccess).orElse(Collections.emptyList()).stream().map(SimpleGrantedAuthority::new).forEach(authorities::add);
		return authorities;
	}
}
