'use strict'

const test       = require('ava')
const sinon      = require('sinon')
const proxyquire = require('proxyquire')

const postMessage = sinon.spy((a, b, c, cb) => cb())
const Slack       = proxyquire('../lib/slack', {
  '@slack/client': {
    WebClient: function () {
      this.chat = { postMessage }
    },
  },
})

test('post', async t => {
  const slack = new Slack({
    token: 'token',
    channel: 'channel',
    botUser: { username: 'username' },
  })

  const current = { post: 100, stock: 1100 }
  const prev    = { post:  90, stock: 1000 }
  await slack.post(current, prev)

  const [ [ channel, message, botUser ] ] = postMessage.args
  t.is(channel, 'channel')
  t.is(message, '前回: 90 Posts / 1000 Stocks\n今日: 100 Posts / 1100 Stocks')
  t.deepEqual(botUser, { username: 'username' })
})
