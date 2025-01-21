FROM node:22-slim

RUN mkdir electric-rate-engine
WORKDIR electric-rate-engine

COPY package.json package-lock.json .

RUN npm i

COPY . ./

ENTRYPOINT ["npm", "run", "test"]