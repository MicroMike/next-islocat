const Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({
  electronPath: require('electron'),
  // openDevTools: {
  //   mode: 'detach'
  // },
  waitTimeout: 3600000,
  show: false,
  typeInterval: 300,
  webPreferences: {
    webSecurity: false,
    allowRunningInsecureContent: true,
    plugins: true,
    experimentalFeatures: true
  }
})
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
]

function getRandomInt(max, min) {
  return Math.floor(Math.random() * Math.floor(max) + (min ? min : 1));
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

const doItAgain = (first) => {
  console.log(first ? 'start' : 'change')

  nightmare
    .goto('https://open.spotify.com/' + artists[getRandomInt(artists.length - 1, 0)])
    .wait(3000)
    .forward()
    // .click('.artist-header .btn.btn-black')
    .click('.tracklist-play-pause.tracklist-middle-align')
    .wait(5000)
    .click('.control-button.spoticon-shuffle-16')
}

const tempmail = [
  'https://www.mohmal.com/fr/create/random',
  'https://www.mohmal.com/fr/create/random',
  'https://www.tempmailaddress.com',
  'https://www.tempmailaddress.com',
  // 'https://www.crazymailing.com',
]

var emailurl = tempmail[getRandomInt(tempmail.length - 1, 0)]

const create = async (newAccount) => {
  try {
    nightmare
      .goto(emailurl)
      .wait(2000)

    const tempmail = newAccount
      ? await nightmare
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
      : emails[getRandomInt(emails.length - 1, 0)]

    console.log('load: ' + tempmail)

    nightmare
      .goto(url(newAccount))
      .forward()

    nightmare
      .evaluate((newAccount) => {
        // jQuery.noConflict();

        const anticaptcha = () => {
          $.ajax({
            url: 'https://api.anti-captcha.com/createTask',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify({
              clientKey: '2e7376e717a0ea614d93d6f921238352',
              task: {
                type: 'NoCaptchaTaskProxyless',
                websiteKey: newAccount ? $('[data-sitekey]').attr('data-sitekey') : '6LeIZkQUAAAAANoHuYD1qz5bV_ANGCJ7n7OAW3mo',
                websiteURL: newAccount ? 'https://spotify.com/fr/signup' : 'https://accounts.spotify.com/fr/login',
              }
            })
          })
            .done(function (response) {
              console.log(response)
              $('body').append('<div>' + response + '<div>')

              const interval = setInterval(() => {
                $.ajax({
                  url: 'https://api.anti-captcha.com/getTaskResult',
                  method: 'POST',
                  dataType: 'json',
                  data: JSON.stringify({
                    clientKey: '2e7376e717a0ea614d93d6f921238352',
                    taskId: response.taskId
                  })
                })
                  .done(function (response) {
                    console.log(response)
                    if (response.status !== 'processing') {
                      clearInterval(interval)
                      document.getElementById('g-recaptcha-response').value = response.solution.gRecaptchaResponse
                      $('body').append('<div id="tokenMicro" >' + response.solution.gRecaptchaResponse + '<div>')
                    }
                  });
              }, 10000)
            }, 5000);
        }

        const twocaptcha = () => {
          $.ajax({
            url: 'http://2captcha.com/in.php',
            method: 'POST',
            data: {
              key: '964a5072a7fdea86b877739dc4ea4788',
              method: 'userrecaptcha',
              googlekey: newAccount ? '6LdaGwcTAAAAAJfb0xQdr3FqU4ZzfAc_QZvIPby5' : '6LeIZkQUAAAAANoHuYD1qz5bV_ANGCJ7n7OAW3mo',
              pageurl: newAccount ? 'https://spotify.com/fr/signup' : 'https://accounts.spotify.com/fr/login',
            }
          })
            .done(function (response) {
              console.log(response)
              $('body').append('<div>' + response + '<div>')

              const interval = setInterval(() => {
                $.ajax({
                  url: 'http://2captcha.com/res.php',
                  method: 'POST',
                  data: {
                    key: '964a5072a7fdea86b877739dc4ea4788',
                    action: 'get',
                    id: response.split('|')[1]
                  }
                })
                  .done(function (response) {
                    console.log(response)
                    if (response !== 'CAPCHA_NOT_READY') {
                      clearInterval(interval)
                      document.getElementById('g-recaptcha-response').value = response.split('|')[1]
                      $('body').append('<div id="tokenMicro" >' + response + '<div>')
                    }
                  });
              }, 10000)
            }, 5000);
        }

        // anticaptcha()
        twocaptcha()

      }, newAccount)

    if (newAccount) {
      nightmare
        .type('form input[name="email"]', tempmail)
        .type('form input[name="confirm_email"]', tempmail)
        .type('form input[name="password"]', tempmail)
        .type('form input[name="displayname"]', tempmail.split('@')[0])
        .type('form input[name="dob_day"]', getRandomInt(28))
        .select('form select[name="dob_month"]', month)
        .type('form input[name="dob_year"]', getRandomInt(32, 1963))
        .click('form input[id="register-male"]')
    }
    else {
      nightmare
        .type('form input[name="username"]', tempmail)
        .type('form input[name="password"]', tempmail)
    }

    await nightmare
      .wait('#tokenMicro')
      .click(newAccount ? '#register-button-email-submit' : '#login-button')
      .wait('.welcome-message')

    await console.log('account created: ' + tempmail)

    if (newAccount) {
      nightmare
        .goto(emailurl)
        .forward()

      if (emailurl === 'https://www.mohmal.com/fr/create/random') {
        await nightmare
          .evaluate(() => {
            var id = $('[data-msg-id]').attr('data-msg-id')
            window.location = 'https://www.mohmal.com/fr/message/' + id
          })
        var urlactivate = await nightmare
          .forward()
          .wait('.call-to-action-button')
          .evaluate(() => {
            console.log(document.getElementsByClassName('call-to-action-button')[0])
            return document.getElementsByClassName('call-to-action-button')[0].href;
          })
      }
      // case 'https://www.crazymailing.com':
      if (emailurl === 'https://www.tempmailaddress.com') {
        var urlactivate = await nightmare
          .wait('#schranka tr.hidden-md[data-href="2"]')
          .goto('https://www.tempmailaddress.com/email/id/2')
          .forward()
          .goto('https://www.tempmailaddress.com/email/id/2')
          .forward()
          .wait('.call-to-action-button')
          .evaluate(() => {
            console.log(document.getElementsByClassName('call-to-action-button')[0])
            return document.getElementsByClassName('call-to-action-button')[0].href;
          })
      }

      nightmare
        .goto(urlactivate)
        .forward()
        .wait(5000)
    }

    doItAgain(true)
  }
  catch (e) {
    console.log(e)
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
      console.error('Search failed:', error)
    })

}

setTimeout(() => {
  create(true)
}, getRandomInt(120000));

// setInterval(() => {
//   create(true)
//   // create(yn70)
// }, intervalHours)