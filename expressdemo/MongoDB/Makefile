prepare:
	docker build -t mongo .
	docker run -td --name mongo-container -p 27017:27017 mongo
	
#	docker run --name sql-container -d -p 27017:27017 nawaf-sql
#	echo "Waiting For DB..."
#	docker exec sql-container mysqladmin --silent --wait=85 -uNawafUser -pNawafPass ping || exit 1 
#	echo "Inserting data..."
#	sleep 70
#	docker exec -i sql-container mysql -uNawafUser -pNawafPass NawafDB < setup.sql

#	bash init.sh

#server-up: 
#	docker exec -it web-container node server.js

connect:
	echo "Connecting to Server..."
	docker exec -it mongo-container /bin/bash

stop:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)

destroy:
	docker image rm -f $$(docker images -a -q)		
