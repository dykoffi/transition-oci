FROM alpine 
# node:18-alpine3.16
RUN apk add nodejs npm --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/main --allow-untrusted
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN echo "@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk add --update --no-cache py3-numpy py3-pandas py3-openpyxl
RUN pip3 install xlrd unidecode
RUN npm i -g yarn

WORKDIR /app

COPY ./package.json ./
RUN yarn install
COPY . .

RUN npx prisma generate

RUN yarn build

COPY ./src/assets ./dist/assets
COPY ./src/services/scripts ./dist/src/services/scripts

ENV DATABASE_URL=
ENV MINIO_ENDPOINT=
ENV MINIO_PORT=
ENV MINIO_ACCESS_KEY=
ENV MINIO_SECRET_KEY=
ENV MINIO_BUCKETNAME=
EXPOSE 3000


CMD NODE_ENV=${NODE_ENV} && echo "MINIO_BUCKETNAME=${MINIO_BUCKETNAME}" > .env && echo "MINIO_SECRET_KEY=${MINIO_SECRET_KEY}" >> .env && echo "MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}" >> .env && echo "MINIO_PORT=${MINIO_PORT}" >> .env && echo "MINIO_ENDPOINT=${MINIO_ENDPOINT}" >> .env && echo "DATABASE_URL=${DATABASE_URL}" >> .env && npx prisma migrate deploy && node dist/src/main.js