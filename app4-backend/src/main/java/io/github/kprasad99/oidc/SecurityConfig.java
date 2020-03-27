package io.github.kprasad99.oidc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;

@Configuration
@EnableWebFluxSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private KeycloakGrantedAuthorityMapper mapper;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().disable().csrf().disable().authorizeRequests().anyRequest().authenticated().and().oauth2Login().userInfoEndpoint().userAuthoritiesMapper(mapper);
	}
	
}
