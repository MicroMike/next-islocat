const Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({
  electronPath: require('electron'),
  // openDevTools: {
  //   mode: 'detach'
  // },
  waitTimeout: 60000,
  show: false,
  typeInterval: 300,
  webPreferences: {
    webSecurity: false,
    allowRunningInsecureContent: true,
    plugins: true,
    experimentalFeatures: true
  }
})
var request = require('ajax-request');
// var iframe = require('nightmare-iframe');

var countries = [
  // 'de',
  // 'be',
  // 'dk',
  // 'es',
  'fr',
  // 'el',
  // 'it',
  // 'lu',
  // 'nl',
  // 'pt',
  // 'uk',
]

var emails = [
  'westyn.dayson@0live.org',
  'juanmiguel.rylyn@0live.org',
  'makoto.charlee@0live.org',
  'savva.tyrion@0live.org',
  'giulio.dexton@0live.org',
  'gennaro.legacy@0live.org',
  'tao.tariq@0live.org',
  'srihan.naman@0live.org',
  'dalan.javaughn@0live.org',
  'tavish.edisson@0live.org',
  'lycan.chaz@0live.org',
  'khade.jewel@0live.org',
  'kunga.kelby@0live.org',
  'xzavian.kael@0live.org',
  'nash.kristofer@0live.org',
  'belal.khang@0live.org',
  'keontre.toki@0live.org',
  'jontrell.darcy@0live.org',
  'ermias.paris@0ils.net',
  'aasim.oluwatomiwa@ldaho.net',
  'frederic.raihan@ldaho.net',
  'kensington.alvis@ldaho.net',
  'marlow.novah@ldaho.net',
  'reynold.donnie@ldaho.net',
  'marlow.novah@ldaho.net',
  'reynold.donnie@ldaho.net',
  'jahkye.osbourne@ldaho.net',
  'kayse.zhaire@ldaho.net',
  'taran.gardner@ldaho.net',
  'akari.kohl@ldaho.net',
  'imaan.mattox@ldaho.net',
  'akari.kohl@ldaho.net',
  'kayse.zhaire@ldaho.net',
  'imaan.mattox@ldaho.net',
  'taran.gardner@ldaho.net',
  'roland.avondre@ldaho.net',
  'master.mantra@ldaho.net',
  'ephriam.azarias@ldaho.net',
  'chelsea.kennett@ldaho.net',
  'huzaifa.brendyn@ldaho.net',
  'master.mantra@ldaho.net',
  'huzaifa.brendyn@ldaho.net',
  'ephriam.azarias@ldaho.net',
  'roland.avondre@ldaho.net',
  'elder.suyash@ldaho.net',
  'sofian.emari@ldaho.net',
  'tyris.phoenixx@ldaho.net',
  'reif.jaiceon@ldaho.net',
  'elder.suyash@ldaho.net',
  'rayon.trek@ldaho.net',
  'reif.jaiceon@ldaho.net',
  'tyris.phoenixx@ldaho.net',
  'sofian.emari@ldaho.net',
  'brenner.hailey@ldaho.net',
  'rally.zailyn@ldaho.net',
  'rally.zailyn@ldaho.net',
  'qian.artavious@ldaho.net',
  'justin.kees@ldaho.net',
  'brenner.hailey@ldaho.net',
  'justin.kees@ldaho.net',
  'qian.artavious@ldaho.net',
  'yeshaya.abraham@ldaho.net',
  'julien.chadrick@ldaho.net',
  'mercy.aalijah@ldaho.net',
  'kaos.ulices@ldaho.net',
  'brodrick.draven@ldaho.net',
  'julien.chadrick@ldaho.net',
  'yeshaya.abraham@ldaho.net',
  'mercy.aalijah@ldaho.net',
  'brodrick.draven@ldaho.net',
  'brentyn.manav@ldaho.net',
  'zebulon.preslee@ldaho.net',
  'lukah.samik@ldaho.net',
  'rayne.arin@ldaho.net',
  'riker.oleg@ldaho.net',
  'zebulon.preslee@ldaho.net',
  'riker.oleg@ldaho.net',
  'rayne.arin@ldaho.net',
  'lukah.samik@ldaho.net',
  'damiano.bob@ldaho.net',
  'mizael.lofton@ldaho.net',
  'cort.tenzing@ldaho.net',
  'damiano.bob@ldaho.net',
  'angelito.harfateh@ldaho.net',
  'mizael.lofton@ldaho.net',
  'eyoel.emin@ldaho.net',
  'angelito.harfateh@ldaho.net',
  'eyoel.emin@ldaho.net',
  'wheeler.niklas@ldaho.net',
  'muhammad.severiano@ldaho.net',
  'rajveer.prynceton@ldaho.net',
  'syair.kengo@ldaho.net',
  'wheeler.niklas@ldaho.net',
  'muhammad.severiano@ldaho.net',
  'rajveer.prynceton@ldaho.net',
  'richy.aun@ldaho.net',
  'nolen.haston@ldaho.net',
  'brantson.degan@ldaho.net',
  'richy.aun@ldaho.net',
  'brantson.degan@ldaho.net',
  'jotaro.xiomar@ldaho.net',
  'nolen.haston@ldaho.net',
  'russell.kyriee@ldaho.net',
  'jotaro.xiomar@ldaho.net',
  'russell.kyriee@ldaho.net',
]

function getRandomInt(max, min) {
  return Math.floor(Math.random() * Math.floor(max) + (typeof min !== 'undefined' ? min : 1));
}

var month = getRandomInt(12)
month = month < 10 ? '0' + month : '' + month

var url = (newAccount) => (newAccount ? 'https://spotify.com/fr/signup' : 'https://accounts.spotify.com/fr/login');

var artists = [
  'artist/4fjzml1NOgcHdsmJM00i7a',
  'artist/5WuAJTOU9cvpenk1t5CyJM',
  'artist/5c8MuSvGUcVLTRmjMmg3OO',
  'album/0hf0fEpwluYYWwV1OoCWGX',
  'album/5ceAg32Kt8ta6U7qWYPesW',
  'album/3FJdPTLyJVPYMqQQUyb6lr',
  'album/6vvfbzMU2dkFQRJiP99RS4',
]

var oneHour = 3600000;
var interval = getRandomInt(720000, 480000)
var intervalHours = getRandomInt(oneHour * 3, oneHour * 1.5)

var yn70 = () => (getRandomInt(10, 1) > 7 ? true : false)

const doItAgain = async (first) => {
  await nightmare
    .wait(5000)
    .goto('https://open.spotify.com/' + artists[getRandomInt(artists.length, 0)])
    .forward()
    // .click('.artist-header .btn.btn-black')
    .wait('.tracklist-play-pause.tracklist-middle-align')
    .click('.tracklist-play-pause.tracklist-middle-align')
    .wait(5000)
    .click('.control-button.spoticon-shuffle-16')

  await console.log('\x1b[34m%s\x1b[0m', first ? 'start' : 'change')
}

const tempmaillist = [
  'https://www.tempmailaddress.com',
  'https://www.tempmailaddress.com',
  // 'https://www.mohmal.com/fr/create/random',
  // 'https://www.crazymailing.com',
]

var emailurl = tempmaillist[getRandomInt(tempmaillist.length, 0)]

const create = async (newAccount, captcha, tempmail) => {
  try {
    await nightmare
      .goto(url(newAccount))
      .forward()

    if (newAccount) {
      await nightmare
        .evaluate((captcha) => {
          document.getElementById('g-recaptcha-response').value = captcha
        }, captcha)

      nightmare
        .type('form input[name="email"]', tempmail)
        .type('form input[name="confirm_email"]', tempmail)
        .type('form input[name="password"]', tempmail)
        .type('form input[name="displayname"]', tempmail.split('@')[0])
        .type('form input[name="dob_day"]', getRandomInt(28))
        .select('form select[name="dob_month"]', month)
        .type('form input[name="dob_year"]', getRandomInt(32, 1963))
        .click('form input[id="register-male"]')
        .wait(10000)
        .click('#register-button-email-submit')
    }
    else {
      await nightmare
        .type('form input[name="username"]', tempmail)
        .type('form input[name="password"]', tempmail)
        .wait(2000)
        .evaluate((captcha) => {
          window.___grecaptcha_cfg.clients[0].ba.l.callback(captcha)
        }, captcha)
    }

    await console.log('\x1b[32m%s\x1b[0m', (newAccount ? 'account created: ' : 'account logged: ') + tempmail)

    if (newAccount) {
      await nightmare
        .wait('.welcome-message')
        .goto(emailurl)
        .forward()

      if (emailurl === 'https://www.mohmal.com/fr/create/random') {
        var urlclick = await nightmare
          .wait(5000)
          .evaluate(() => {
            var id = $('[data-msg-id]').attr('data-msg-id')
            return 'https://www.mohmal.com/fr/message/' + id
          })

        var urlactivate = await nightmare
          .goto(urlclick)
          .forward()
          .wait('.call-to-action-button')
          .evaluate(() => {
            return document.getElementsByClassName('call-to-action-button')[0].href;
          })
      }
      if (emailurl === 'https://www.tempmailaddress.com') {
        var urlactivate = await nightmare
          .wait('#schranka tr.hidden-md[data-href="2"]')
          .goto('https://www.tempmailaddress.com/email/id/2')
          .forward()
          .goto('https://www.tempmailaddress.com/email/id/2')
          .forward()
          .wait('.call-to-action-button')
          .evaluate(() => {
            return document.getElementsByClassName('call-to-action-button')[0].href;
          })
      }

      await nightmare
        .goto(urlactivate)
        .forward()
        .wait(5000)
    }

    doItAgain(true)
  }
  catch (e) {
    console.log('\x1b[31m%s\x1b[0m', e)
  }

  setInterval(() => {
    doItAgain()
  }, interval);

  // .goto('https://open.spotify.com/album/0hf0fEpwluYYWwV1OoCWGX')
  // // .wait('.tracklist-header__extra-buttons .btn.btn-transparent')
  // .click('.tracklist-header__extra-buttons .btn.btn-transparent')
  // .goto('https://open.spotify.com/collection/tracks')
  // .click('.tracklist-top-align')

  nightmare
    .catch(error => {
      console.error('\x1b[31m%s\x1b[0m', 'Search failed:', error)
    })

}

const twocaptcha = (newAccount, tempmail) => {
  request.post({
    url: 'http://2captcha.com/in.php',
    data: {
      key: '964a5072a7fdea86b877739dc4ea4788',
      method: 'userrecaptcha',
      googlekey: newAccount ? '6LdaGwcTAAAAAJfb0xQdr3FqU4ZzfAc_QZvIPby5' : '6LeIZkQUAAAAANoHuYD1qz5bV_ANGCJ7n7OAW3mo',
      pageurl: newAccount ? 'https://spotify.com/fr/signup' : 'https://accounts.spotify.com/fr/login',
      invisible: newAccount ? 0 : 1
    }
  }, function (err, res, body) {
    console.log(body)

    const interval = setInterval(() => {
      request({
        url: 'http://2captcha.com/res.php',
        method: 'GET',
        data: {
          key: '964a5072a7fdea86b877739dc4ea4788',
          action: 'get',
          id: body.split('|')[1]
        }
      }, function (err, res, body) {

        if (body !== 'CAPCHA_NOT_READY') {
          clearInterval(interval)
          create(newAccount, body.split('|')[1], tempmail)
        }
        else {
          console.log(body.split('|')[0])
        }
      });
    }, 10000)
  })
}

const anticaptcha = (newAccount, tempmail) => {
  request({
    url: 'https://api.anti-captcha.com/createTask',
    method: 'POST',
    json: true,
    data: {
      clientKey: '5cf44dee27fed739df49a69bb4494b9a',
      task: {
        type: 'NoCaptchaTaskProxyless',
        websiteKey: newAccount ? '6LdaGwcTAAAAAJfb0xQdr3FqU4ZzfAc_QZvIPby5' : '6LeIZkQUAAAAANoHuYD1qz5bV_ANGCJ7n7OAW3mo',
        websiteURL: newAccount ? 'https://spotify.com/fr/signup' : 'https://accounts.spotify.com/fr/login',
        invisible: newAccount ? 0 : 1
      }
    }
  }, function (err, res, response) {
    console.log(response)

    const interval = setInterval(() => {
      request({
        url: 'https://api.anti-captcha.com/getTaskResult',
        method: 'POST',
        json: true,
        data: {
          clientKey: '5cf44dee27fed739df49a69bb4494b9a',
          taskId: response.taskId
        }
      }, function (err, res, response) {
        if (response.status !== 'processing') {
          clearInterval(interval)
          create(newAccount, response.solution.gRecaptchaResponse, tempmail)
        }
        else {
          console.log(response)
        }
      });
    }, 10000)
  });
}

const isNew = process.env.NEWACCOUNT === '1'

const tempmail = isNew
  ? nightmare
    .goto(emailurl)
    .wait(2000)
    .evaluate((emailurl) => {
      switch (emailurl) {
        case 'https://www.mohmal.com/fr/create/random':
          return $('[data-email]').attr('data-email')
        case 'https://www.crazymailing.com':
          return document.getElementById('email_addr').innerText
        case 'https://www.tempmailaddress.com':
          return document.getElementById('email').innerText
      }
    }, emailurl)
  : emails[getRandomInt(emails.length, 0)]

console.log('\x1b[33m%s\x1b[0m', 'load: ' + tempmail)

setTimeout(async () => {
  anticaptcha(isNew, tempmail);
  // twocaptcha(isNew);
  // create(true)
}, getRandomInt(180000));
