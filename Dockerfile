FROM node:latest
RUN  mkdir /app
WORKDIR  /app
COPY package.json  ./
RUN npm install --force
COPY . ./
EXPOSE 4000
CMD [ "node", "index.js" ]