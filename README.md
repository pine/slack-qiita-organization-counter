slack-qiita-organization-counter
--------------------------------

Count posts/stocks of your Qiita organization, and post counting to your Slack.

## Synopsis
![](synopsis.png)

## Requirements

- Node.js v6 ~
- Redis 2.6.12 ~

## Getting Started

```
$ git clone https://github.com/pine/slack-qiita-organization-counter.git
$ cd slack-qiita-organization-counter
$ npm install
$ QIITA_ORGANIZATION=xxx SLACK_API_TOKEN=XXX SLACK_CHANNEL=xxx \
  bin/slack-qiita-organization-counter
```

## Options
You can set any options uses environment variables.

- `QIITA_ORGANIZATION` Qiita organization name (**required**)
- `SLACK_API_TOKEN` Slack API token (**required**)
- `SLACK_CHANNEL` Slack channel/group name (**required**))
- `SLACK_USERNAME` Slack username
  - Default: `'Qiita'`
- `SLACK_ICON_URL` Slack icon URL
  - Default: `''`
- `REDIS_PORT` Redis port number
  - Default: `6379`
- `REDIS_HOST` Redis host name
  - Default: `'127.0.0.1'`
- `REDIS_DATABASE` Redis database number
  - Default: `0`
- `REDIS_PREFIX` Redis key prefix
  - Default: `''`

## License

Public Domain
