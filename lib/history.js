'use strict'

const co  = require('co')
const ymd = require('ymd')

class History {
  constructor({ redis }) {
    this.redis = redis
  }

  get(date) {
    const _this = this
    return co(function* () {
      const key  = ymd(date).ymd
      const data = yield _this.redis.getAsync(key)

      if (data) {
        return JSON.parse(data)
      }
      return null
    })
  }

  set(date, data) {
    const key = ymd(date).ymd
    return this.redis.setAsync(key, JSON.stringify(data))
  }
}

module.exports = History
