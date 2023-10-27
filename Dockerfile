#Build phase with node
from node:18.18.2-buster-slim as build
#Set the working directory
WORKDIR /app
#Copy dependency list
COPY package.json ./
#Install dependencies
RUN npm install
#Copy the rest of the files
COPY . .
#Set the environment variable
ENV VITE_API_URL="https://api.ramenadvisor.fr/api/v1"
#Build the app
RUN npm run build

#Run phase on nginx
FROM nginx
#Copy the build folder to the nginx folder
COPY  --from=build /app/dist/ /usr/share/nginx/html/
#Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#Expose port 80
EXPOSE 80

