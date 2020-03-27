package io.github.kprasad99.oidc;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class KeycloakGrantedAuthorityMapper implements GrantedAuthoritiesMapper {

	@Override
	public Collection<? extends GrantedAuthority> mapAuthorities(Collection<? extends GrantedAuthority> authorities) {
		Set<GrantedAuthority> mappedAuthoties = new HashSet<>();
		authorities.forEach(mappedAuthoties::add);
		authorities.forEach(authority->{
			if(OidcUserAuthority.class.isInstance(authority)) {
				OidcUserAuthority oidcUserAuthority = (OidcUserAuthority) authority;
				OidcUserInfo userInfo = oidcUserAuthority.getUserInfo();
				Optional.ofNullable(userInfo.getClaimAsStringList("authorities")).orElse(Collections.emptyList()).stream().map(SimpleGrantedAuthority::new).forEach(mappedAuthoties::add);	
			}
			if(OAuth2UserAuthority.class.isInstance(authority)) {
				OAuth2UserAuthority oAuth2UserAuthority = (OAuth2UserAuthority) authority;
				Map<String, Object> userAttributes = oAuth2UserAuthority.getAttributes();
				
			}
		});
		return null;
	}
}
