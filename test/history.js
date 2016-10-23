'use strict'

const test         = require('ava')
const redis        = require('redis')
const bluebird     = require('bluebird')
const randomstring = require('randomstring')

const History      = require('../lib/history')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)


test.beforeEach(t => {
  t.context.prefix = randomstring.generate()
  t.context.client = redis.createClient({ prefix: `${t.context.prefix}_` })
})


test.afterEach(async t => {
  const rawKeys = await t.context.client.keysAsync(`${t.context.prefix}_*`)
  if (rawKeys.length > 0) {
    const keys = rawKeys.map(key => key.replace(`${t.context.prefix}_`, ''))
    await t.context.client.delAsync(keys)
  }
  await t.context.client.quitAsync()
})


test('get/set', async t => {
  const history = new History({ redis: t.context.client })

  t.deepEqual(await history.get(new Date(2016, 1, 1)), null)

  await history.set(new Date(2016, 1, 1), { foo: 1 })
  await history.set(new Date(2016, 1, 2), { bar: 2 })
  await history.set(new Date(2016, 1, 2), { baz: 3 })
  t.deepEqual(await history.get(new Date(2016, 1, 1)), { foo: 1 })
  t.deepEqual(await history.get(new Date(2016, 1, 2)), { baz: 3 })
})
