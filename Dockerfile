#Build phase with node
from node:18.18.2-buster-slim as build
#Set the working directory
WORKDIR /app
#Copy dependency list
COPY package.json ./
#Install dependencies
RUN npm install --omit=dev
#Copy the rest of the files
COPY . .
#Build the app
RUN npm run build

#Run phase on nginx
FROM nginx
COPY  --from=build /app/dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

