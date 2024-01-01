# 1. For build React app
FROM node:lts AS development
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

# Same as npm install
RUN pnpm install

COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "pnpm", "build" ]

FROM development AS build

RUN npm run build

