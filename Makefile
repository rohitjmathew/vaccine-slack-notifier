run: 
	echo "Starting Service"
	npm i && pm2 start vaccineNotifier.js

stop:
	echo "Stopping Service"
	pm2 stop vaccineNotifier.js && pm2 delete vaccineNotifier.js
