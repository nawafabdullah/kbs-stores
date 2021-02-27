init:
	@sleep 2
	@echo ""
	@node ./MongoDB/containerFiles/initialaizeAdminsDB.js
	@echo "SUCCESS:: ** Admins Database Intilaized Succesfully ** " 
	@echo ""
	@echo "=========================================================================="
	@echo ""
	@#==================================================================================#
	@node ./MongoDB/containerFiles/initialaizeUsersDB.js
	@echo "SUCCESS:: ** Application Database Intilaized Succesfully ** " 
	@echo ""
	@echo "=========================================================================="
	@echo ""
	@#==================================================================================#
	@echo "Starting Application's Main Server... "
	@echo ""
	@sleep 2
	@nodemon ./WebSite/containerFiles/mainServer.js
	@echo ""
	@echo "=========================================================================="
	@echo ""


clean:
	@node ./MongoDB/containerFiles/removeCollections.js
