FROM node:18-alpine as install
 
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

FROM node:18-alpine as build

WORKDIR /app

COPY --from=install /app/node_modules/ ./node_modules/
COPY --from=install /app/package.json ./package.json

COPY tsconfig.json .

RUN yarn build

FROM node:18-alpine as release

WORKDIR /app

COPY --from=install /app/package.json ./package.json

RUN yarn install --production

COPY --from=build /app/dist/ ./dist/

CMD ["node", "dist/app.js"]