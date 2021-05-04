# Vaccine Slack Notifier

Slack Notifier for India Vaccine Appointment. This checks the Co-WIN portal periodically to find vaccination slots available in the provided pin codes and for your age.

It triggers a slack notification to your channel added as a part of environment variable for all the pin codes added to the environment variable 

## Prerequisites

- You need to setup slack incoming webhooks to be able to receive alerts. Follow the following [tutorial](https://api.slack.com/messaging/webhooks) and use the webhook link in your environment variables
- You need a DigitalOcean account to deploy this on a cloud provider. If not click on the deploy button below and first create your account. 

## Deployment

To deploy this project click the button below to deploy the code on DigitalOcean

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/rohitjmathew/vaccine-slack-notifier/tree/main&refcode=4c19f19961b8)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PINCODES`

`SLACK_WEBHOOK`

`SCHEDULE`

An example version can be seen [here](https://github.com/rohitjmathew/vaccine-slack-notifier/blob/main/.env.sample)

## Run Locally

Clone the project

```bash
  git clone https://github.com/rohitjmathew/vaccine-slack-notifier
```

Go to the project directory

```bash
  cd vaccine-slack-notifier
```

### Using PM2

- Install PM2
```bash
  npm install pm2 -g
```

- Start the server

```bash
  make pm2-run
```

- Stop the server

```bash
  make pm2-stop
```

### Using Docker

- Ensure Docker is installed

- Start the server

```bash
  make docker-run
```

- Stop the server

```bash
  make docker-stop
```

## Screenshots

<img width="483" alt="Sample Screenshot" src="https://user-images.githubusercontent.com/17832347/116944784-c62dea80-ac93-11eb-9b47-8933ecfd641a.png">

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](/CONTRIBUTING.md) for ways to get started.

## License

[MIT](/LICENSE)

This readme was created with [readme.so](https://readme.so) :)
