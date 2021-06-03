FROM caddy:latest

WORKDIR /app
COPY ./site ./site
COPY ./Caddyfile ./Caddyfile

CMD ["caddy", "run"]