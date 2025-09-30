# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT create a public GitHub issue

Security vulnerabilities should be reported privately to protect users until a fix is available.

### 2. Report the vulnerability

Please report security vulnerabilities by emailing us at: security@yourdomain.com

Include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes or mitigations

### 3. Response timeline

We will respond to security reports within 48 hours and provide updates on our progress.

### 4. Disclosure timeline

- We will acknowledge receipt of your report within 48 hours
- We will provide regular updates on our progress
- We will notify you when the vulnerability is fixed
- We will coordinate public disclosure timing with you

## Security Best Practices

### For Users

1. **Keep dependencies updated**: Regularly update your dependencies to get security patches
2. **Use environment variables**: Never commit API keys or sensitive data to version control
3. **Enable HTTPS**: Always use HTTPS in production environments
4. **Review code**: Before deploying, review all code changes
5. **Monitor logs**: Keep an eye on application logs for suspicious activity

### For Developers

1. **Input validation**: Always validate and sanitize user input
2. **Authentication**: Implement proper authentication and authorization
3. **CORS configuration**: Configure CORS appropriately for your environment
4. **Error handling**: Don't expose sensitive information in error messages
5. **Dependencies**: Regularly audit dependencies for known vulnerabilities

## Environment Variables Security

Never commit the following to version control:

- API keys
- Database credentials
- JWT secrets
- OAuth client secrets
- Any other sensitive configuration

Use environment variables and the provided `.env.example` template:

```bash
# Copy the example file
cp server/env.example server/.env

# Edit with your actual values (never commit this file)
# ALPHA_VANTAGE_API_KEY=your_actual_key_here
# OPENWEATHER_API_KEY=your_actual_key_here
# PORT=3001
```

## Dependencies

We regularly update dependencies to address security vulnerabilities. You can check for known vulnerabilities using:

```bash
# Frontend
npm audit

# Backend
cd server && npm audit
```

## Security Headers

The application includes security headers through Express.js middleware:

- CORS configuration
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Rate limiting (recommended for production)

## Contact

For security-related questions or concerns, please contact us at: security@yourdomain.com

## Acknowledgments

We appreciate the security research community and encourage responsible disclosure of vulnerabilities.
