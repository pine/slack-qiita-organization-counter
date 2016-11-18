'use strict'

const test       = require('ava')
const proxyquire = require('proxyquire')

const { Organization } = proxyquire('../lib/qiita', {
  got: function (url, header) {
    return Promise.resolve({
      body: `
<!DOCTYPE html>
<html xmlns:og="http://ogp.me/ns#">
  <head>
  </head>
  <body>
    <div class="organizationHeader">
      <div class="organizationHeader_container">
        <div class="container">
          <div class="row">
            <div class="col-sm-9">
              <div class="organizationHeader_profile">
                <img alt="" class="organizationHeader_profile_orgLogo" src="">
                <div class="organizationHeader_profile_container">
                  <h1 class="organizationHeader_profile_orgName">株式会社XXX</h1>
                  <a target="_blank" href="http://www.example.com/">http://www.example.com/</a>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="organizationHeader_stats">
                <div class="organizationHeader_stats_container">
                  <div class="organizationHeader_stats_value"><span class="fa fa-file-o"></span> 123</div>
                  <div class="organizationHeader_stats_label">Posts</div>
                </div>
                <div class="organizationHeader_stats_container">
                  <div class="organizationHeader_stats_value"><span class="fa fa-folder-o"></span> 9876</div>
                  <div class="organizationHeader_stats_label">Likes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
      `
    })
  },
})


test('info', async t => {
  const org  = new Organization({ name: 'org' })
  const info = await org.info()

  t.is(info.post, 123)
  t.is(info.like, 9876)
})
