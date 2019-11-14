FROM node:12-alpine AS base
RUN mkdir -p /home/node/app/node_modules
RUN mkdir -p /etc/bedrock-setup
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .

FROM base AS build
RUN apk add --no-cache git bash
WORKDIR /home/node/app
USER node
RUN npm ci --no-optional --production
RUN npm run compile-less

FROM base AS release
COPY --from=build /home/node/app/node_modules ./node_modules
EXPOSE 10443
RUN chown -R node:node /etc/bedrock-setup
USER node
CMD [ "node", "setup.localhost.js", "/etc/bedrock-setup/setup.json", "/etc/bedrock-setup/setup.ini" ]
