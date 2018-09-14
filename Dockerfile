FROM node
COPY ./ /app
WORKDIR /app
EXPOSE 88
RUN npm install -g yarn pm2 && yarn install
CMD ["pm2", "start", "/app/src/index.js", "--no-daemon"]
