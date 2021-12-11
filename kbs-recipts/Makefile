default:
	@nodemon ./internalSystem/containerFiles/internalServer.js

init:
	@sleep 2
	@echo ""
	@node ./mongoDB/containerFiles/initialaizeDBs.js
	@#==================================================================================#
	@echo "Starting Application's Main Server... "
	@echo ""
	@nodemon ./internalSystem/containerFiles/internalServer.js
	
clean:
	@node ./mongoDB/containerFiles/removeCollections.js