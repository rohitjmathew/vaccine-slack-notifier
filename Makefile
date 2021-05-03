pm2-run: 
	echo "Starting Service"
	npm i && pm2 start vaccineNotifier.js

pm2-stop:
	echo "Stopping Service"
	pm2 stop vaccineNotifier.js && pm2 delete vaccineNotifier.js

docker-run:
	echo "Starting Dockerised Service"
	docker build -t vaccine-slack-notifier .
	docker run --name vaccine-slack-notifier -p 8081:8081 -d vaccine-slack-notifier

docker-stop:
	echo "Stopping Dockerised Service"
	docker stop vaccine-slack-notifier && docker rm vaccine-slack-notifier
	docker system prune