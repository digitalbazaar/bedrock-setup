FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 10443
RUN npm run compile-less
COPY --chown=node:node ./lib/config.js ./lib/config.js
CMD [ "node", "setup.localhost.js", "setup-example.json", "some.ini" ]
