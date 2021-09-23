FROM node:alpine
EXPOSE 80
EXPOSE 22
EXPOSE 9229
WORKDIR /usr/fantasy-discord
COPY package.json .
RUN yarn install\
        && yarn global add typescript\
        && yarn global add typeorm
RUN \
 apk add postgresql-client
COPY . .
RUN tsc
ENV NODE_FLAGS=
CMD ./wait-for-postgres.sh \
        && typeorm schema:sync \
        && yarn reloadGuildCommands \ 
        && node ${NODE_FLAGS} .
