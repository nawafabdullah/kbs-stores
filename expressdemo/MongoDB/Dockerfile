FROM node:latest

ADD containerFiles/ dbFiles/

ENTRYPOINT tail -f /dev/null

WORKDIR ./dbFiles

RUN npm install


#npm install;


#apt-get update; \
#apt-get -y install npm; \ 
#apt-get -y install nodejs; \
#apt-get -y install npm; 


#EXPOSE 27017

CMD ["nodemon", "initialaizeUsersDB.js"]
