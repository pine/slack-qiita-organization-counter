slack-github-bot
----------------

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
$ SLACK_API_TOKEN=XXX bin/slack-qiita-organization-counter
```

## Options
You can set any options uses environment variables.

- `SLACK_API_TOKEN` Slack API Token (**required**)
- `SLACK_USERNAME` Slack username
  - Default: `'Qiita'`
- `SLACK_ICON_URL` Slack icon URL
  - Default: `''`

## License

Public Domain
