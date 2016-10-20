'use strict'

const co      = require('co')
const got     = require('got')
const cheerio = require('cheerio')

class Organization {
  constructor({ name }) {
    this.name = name
    this.url  = `http://qiita.com/organizations/${name}`
    this.ua   = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
  }

  info() {
    const _this = this
    return co(function* () {
      const header   = { 'user-agent': _this.ua }
      const response = yield got(_this.url, header)

      const $        = cheerio.load(response.body)
      const statsJq  = $('.organizationHeader_stats_container')
      const stats    = statsJq.map((_, el) => {
        const value = $(el).find('.organizationHeader_stats_value').text()
        const label = $(el).find('.organizationHeader_stats_label').text()
        return { value, label }
      }).get()

      const stockRegex = /Stocks/i
      const stockStat  = stats.find(stat =>  stockRegex.test(stat.label))
      const postStat   = stats.find(stat => !stockRegex.test(stat.label))

      return {
        stock    : parseInt(stockStat.value, 10),
        post     : parseInt(postStat.value, 10),
        timestamp: new Date().getTime(),
      }
    })
  }
}

module.exports = { Organization }
