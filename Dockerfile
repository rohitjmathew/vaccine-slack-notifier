
FROM node:10-alpine

LABEL maintainer="Rohit Mathew"

# Sets environment variable
ENV NODE_ENV production

# Sets work directory
WORKDIR /usr/src/app

# Copy package.json
COPY ["package.json", "./"]

# Installs dependencies 
RUN npm install --production --silent

# Copy working files
COPY . .

# Expose port
EXPOSE 8081

# Starts run command
CMD node vaccineNotifier.js