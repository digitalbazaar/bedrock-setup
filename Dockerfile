FROM node:12-alpine AS base
RUN mkdir -p /home/node/app /etc/bedrock-setup && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .

FROM base AS build
RUN apk add --no-cache git bash
USER node
RUN npm ci --no-optional --production
RUN node setup.localhost.js bundle --webpack-mode production --bundle-mode production

FROM base AS release
COPY --from=build --chown=node:node /home/node/app/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/app/.cache ./.cache
EXPOSE 10443
RUN chown -R node:node /etc/bedrock-setup
USER node
ENV NODE_ENV="production"
CMD [ "node", "setup.localhost.js", "/etc/bedrock-setup/setup.json", "/etc/bedrock-setup/setup.ini", "--bundle-mode", "production"]
