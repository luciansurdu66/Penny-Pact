package org.example.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.example.util.RSAKeyProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.JWK;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    private final RSAKeyProperties keys;

    public SecurityConfiguration(RSAKeyProperties rsaKeyProperties) {
        this.keys = rsaKeyProperties;
    }

    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity httpSecurity
    ) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {
                auth.anyRequest().permitAll();
            });

        return httpSecurity.build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey
            .Builder(keys.getPublicKey())
            .privateKey(keys.getPrivateKey())
            .build();

        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder
            .withPublicKey(keys.getPublicKey())
            .build();
    }
}
