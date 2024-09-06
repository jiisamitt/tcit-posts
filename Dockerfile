# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the rest of the app's source code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the Node.js app
CMD ["node", "server.js"]
