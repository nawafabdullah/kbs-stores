prepare:
	docker build -t ubuntu .
	docker run -td --name ubuntu-container -p 8123:8123 ubuntu
	
#	docker run --name sql-container -d -p 8085:3009 nawaf-sql
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
	docker exec -it ubuntu-container /bin/bash

stop:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)

destroy:
	docker image rm -f $$(docker images -a -q)		