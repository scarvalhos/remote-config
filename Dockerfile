FROM node:16.15-alpine3.15

WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn

COPY . /app

RUN yarn build

RUN yarn pg:generate
RUN yarn pg:latest

RUN yarn mg:generate
RUN yarn mg:latest

EXPOSE 3333

CMD ["yarn", "start"]
