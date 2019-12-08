FROM nginx

COPY index.html /usr/share/nginx/html
COPY scripts/ /usr/share/nginx/html/scripts/

EXPOSE 80