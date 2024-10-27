FROM node:20.18.0

# Recuopera las variables enviadas desde el docker-compose.yml
ARG SERVICE_PORT
ARG MYSQL_CONTAINER_PORT

# Ya que las Variables recuperadas con ARGs solo existen durante la etapa de compilación, la guardo en otra variable "PORT" para que pueda ser consumida con posterioridad
ENV PORT=${SERVICE_PORT}
ENV MYSQL_CONTAINER_PORT=${MYSQL_CONTAINER_PORT}

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

COPY ./wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

RUN npm run build 

CMD /usr/local/bin/wait-for-it mysql:${MYSQL_CONTAINER_PORT} --timeout=60 --strict -- npm run migrate && npm run start

# RUN npm run migrate

EXPOSE ${PORT}

# CMD ["npm", "run", "start"]
