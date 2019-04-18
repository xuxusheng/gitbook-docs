FROM node:10-alpine as builder
WORKDIR /project
COPY package.json yarn.lock .npmrc book.json /project/
RUN yarn install
COPY . /project/
RUN yarn build

FROM nginx:alpine
EXPOSE 8080
COPY --from=builder /project/dist /usr/share/nginx/html/docs
COPY _ci/default.conf /etc/nginx/conf.d/default.conf
