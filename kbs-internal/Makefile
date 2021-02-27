init:
	@sleep 2
	@echo ""
	@node ./mongoDB/containerFiles/initialaizeAdminsDB.js
	@echo "SUCCESS:: ** Admins Database Intilaized Succesfully ** " 
	@echo ""
	@echo "=========================================================================="
	@echo ""
	@#==================================================================================#
	@node ./mongoDB/containerFiles/initialaizeUsersDB.js
	@echo "SUCCESS:: ** Application Database Intilaized Succesfully ** " 
	@echo ""
	@echo "=========================================================================="
	@echo ""
	@#==================================================================================#
	@echo "Starting Application's Main Server... "
	@echo ""
	@sleep 2
	@nodemon ./internalSystem/containerFiles/internalServer.js
	@echo ""
	@echo "=========================================================================="
	@echo ""


clean:
	@node ./mongoDB/containerFiles/removeCollections.js
