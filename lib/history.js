'use strict'

const co  = require('co')
const ymd = require('ymd')

class History {
  constructor({ redis, repair }) {
    this.redis  = redis
    this.repair = repair || 0
  }

  get(date) {
    const _this = this
    return co(function* () {
      for (let i = 0; i < _this.repair + 1; ++i) {
        const key  = ymd(date).ymd
        const data = yield _this.redis.getAsync(key)

        if (data) {
          return JSON.parse(data)
        }
        date.setDate(date.getDate() - 1)
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
