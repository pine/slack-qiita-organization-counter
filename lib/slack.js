'use strict'

const { promisify } = require('bluebird')
const { WebClient } = require('@slack/client')

class Slack {
  constructor({ token, channel, botUser }) {
    this.web     = new WebClient(token)
    this.channel = channel
    this.botUser = botUser
  }

  post(current, prev) {
    let message = ''

    if (prev) {
      message += `前回: ${prev.post} Posts / ${prev.stock} Stocks\n`
      message += `今日: ${current.post} Posts / ${current.stock} Stocks`
    } else {
      message += `今日: ${current.post} Posts / ${current.stock} Stocks`
    }

    const postMessage = promisify(this.web.chat.postMessage.bind(this.web.chat))
    return postMessage(this.channel, message, this.botUser)
  }
}

module.exports = Slack
