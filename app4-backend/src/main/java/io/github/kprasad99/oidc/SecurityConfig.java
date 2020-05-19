package io.github.kprasad99.oidc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {

	@Autowired
	private KeycloakGrantedAuthorityMapper mapper;

//	@Bean
//	public SecurityWebFilterChain securitygWebFilterChain(ServerHttpSecurity http) {
//		return http.authorizeExchange().anyExchange().authenticated().and().oauth2Login().userInfoEndpoint()
//				.userAuthoritiesMapper(mapper).build();
//	}

}
