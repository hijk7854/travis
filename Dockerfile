FROM nginx:1.14.2-alpine

COPY ./build /var/www/test.hijk7854.com
COPY ./nginx.conf /etc/nginx/conf.d/test.hijk7854.com.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]