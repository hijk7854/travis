FROM nginx:1.14.2-alpine

COPY ./build /var/www/test.zychspace.com
COPY ./nginx.conf /etc/nginx/conf.d/test.zychspace.com.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]