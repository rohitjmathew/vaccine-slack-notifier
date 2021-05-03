# Vaccine Slack Notifier

Slack Notifier for India Vaccine Appointment. This checks the Co-WIN portal periodically to find vaccination slots available in the provided pin codes and for your age.

It triggers a slack notification to your channel added as a part of environment variable for all the pin codes added to the environment variable 

## Installation 

You need to setup slack incoming webhooks to be able to receive alerts. Follow the following [tutorial](https://api.slack.com/messaging/webhooks) and use the webhook link in your environment variables

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PINCODES`

`SLACK_WEBHOOK`

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

Install `pm2`

```bash
  npm install pm2 -g
```

Start the server

```bash
  make run
```

Stop the server

```bash
  make stop
```

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](/CONTRIBUTING.md) for ways to get started.

## License

[MIT](/LICENSE)

This readme was created with [readme.so](https://readme.so) :)