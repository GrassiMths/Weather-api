FROM node:18
WORKDIR /app
COPY . .
RUN npm install express axios redis
EXPOSE 3000
CMD ["node", "index.js"]
