FROM node:20.18.0

# Recuopera las variables enviadas desde el docker-compose.yml
ARG SERVICE_PORT

# Ya que las Variables recuperadas con ARGs solo existen durante la etapa de compilación, la guardo en otra variable "PORT" para que pueda ser consumida con posterioridad
ENV PORT=${SERVICE_PORT}

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
