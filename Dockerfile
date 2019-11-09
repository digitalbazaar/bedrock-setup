FROM node:12-alpine AS base
RUN mkdir -p /home/node/app/node_modules /etc/bedrock-setup && chown -R node:node /home/node/app /etc/bedrock-setup
WORKDIR /home/node/app
COPY --chown=node:node . .

FROM base AS build
RUN apk add --no-cache git bash
WORKDIR /home/node/app
USER node
RUN npm install --no-optional --production
RUN npm run compile-less

FROM base AS release
RUN mkdir /etc/bedrock-setup
RUN chown node:node /etc/bedrock-setup
COPY --from=build /home/node/app/node_modules ./node_modules
EXPOSE 10443
USER node
CMD [ "node", "setup.localhost.js", "/etc/bedrock-setup/setup.json", "/etc/bedrock-setup/setup.ini" ]
