package com.coursemanagement.filters;

import com.coursemanagement.utilities.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.AntPathMatcher;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private final List<String> permitAllUrls = Arrays.asList(
        "/account/**",
        "/public/**"
    );

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getServletPath();
        boolean shouldNotFilter = permitAllUrls.stream()
            .anyMatch(pattern -> pathMatcher.match(pattern, path));
        return shouldNotFilter;
    }
private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

@Override
protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
        throws ServletException, IOException {
    final String authHeader = request.getHeader("Authorization");
    logger.info("Authorization header: {}", authHeader);
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        logger.warn("No valid JWT token found in request");
        filterChain.doFilter(request, response);
        return;
    }
    try {
        String jwt = authHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        String role = jwtUtil.extractRole(jwt);

        logger.info("Extracted username: {}", username);
        logger.info("Extracted role: {}", role);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null 
            && !jwtUtil.isTokenExpired(jwt)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+role.toUpperCase())));
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
            logger.info("User {} authenticated successfully", username);
        } else {
            logger.warn("JWT token is expired or invalid for user: {}", username);
        }
    } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SecurityException | IllegalArgumentException e) {
        logger.error("JWT processing failed: {}", e.getMessage());
        filterChain.doFilter(request, response);
        return;
    }
    filterChain.doFilter(request, response);
}
}
