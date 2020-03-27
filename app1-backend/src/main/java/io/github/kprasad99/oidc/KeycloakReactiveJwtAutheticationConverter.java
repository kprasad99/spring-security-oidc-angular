package io.github.kprasad99.oidc;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtGrantedAuthoritiesConverterAdapter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class KeycloakReactiveJwtAutheticationConverter implements Converter<Jwt, Mono<AbstractAuthenticationToken>> {

	private Converter<Jwt, Flux<GrantedAuthority>> jwtGrantedAuthoritiesConverter = new ReactiveJwtGrantedAuthoritiesConverterAdapter(
			new JwtGrantedAuthoritiesConverter());

	private Converter<Jwt, Flux<GrantedAuthority>> customJwtGrantedAuthoritiesConverter = new ReactiveJwtGrantedAuthoritiesConverterAdapter(
			new KeycloakJwtAutheticationConverter());

	
	@Override
	public Mono<AbstractAuthenticationToken> convert(Jwt jwt) {
		Flux<GrantedAuthority> auth1 = this.jwtGrantedAuthoritiesConverter.convert(jwt);
		Flux<GrantedAuthority> auth2 = this.customJwtGrantedAuthoritiesConverter.convert(jwt);
		return Flux.merge(auth1, auth2).collectList()
				.map(authorities -> new JwtAuthenticationToken(jwt, authorities));
	}

	/**
	 * Sets the {@link Converter Converter&lt;Jwt, Flux&lt;GrantedAuthority&gt;&gt;}
	 * to use. Defaults to a reactive {@link JwtGrantedAuthoritiesConverter}.
	 *
	 * @param jwtGrantedAuthoritiesConverter The converter
	 * @see JwtGrantedAuthoritiesConverter
	 */
	public void setJwtGrantedAuthoritiesConverter(
			Converter<Jwt, Flux<GrantedAuthority>> jwtGrantedAuthoritiesConverter) {
		Assert.notNull(jwtGrantedAuthoritiesConverter, "jwtGrantedAuthoritiesConverter cannot be null");
		this.jwtGrantedAuthoritiesConverter = jwtGrantedAuthoritiesConverter;
	}
}
