FROM node:18 as builder

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .
RUN yarn install 
COPY . .
RUN yarn build --mode oci

FROM nginx:1.21.0-alpine as production
# TODO Why you use "As production" if dont use it after

COPY --from=builder ./app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
