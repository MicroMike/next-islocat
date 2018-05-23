const Nightmare = require('nightmare')
require('nightmare-iframe-manager')(Nightmare);
const nightmare = Nightmare({
  electronPath: require('electron'),
  // openDevTools: {
  //   mode: 'detach'
  // },
  waitTimeout: 3600000,
  show: true,
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

var email = [
  // 'niall.klein@0clock.org',
  // 'beauden.wrigley@0clock.org',
  // 'zandyr.remus@0clock.org',
  // 'khai.omari@0clock.org',
  'taylor.ilyas@0clock.org',
]

function getRandomInt(max, min) {
  return Math.floor(Math.random() * Math.floor(max) + (min ? min : 1));
}

var month = getRandomInt(12)
month = month < 10 ? '0' + month : '' + month

var url = 'https://spotify.com/fr/signup';

var artists = [
  'artist/4fjzml1NOgcHdsmJM00i7a',
  'artist/5WuAJTOU9cvpenk1t5CyJM',
  'artist/5c8MuSvGUcVLTRmjMmg3OO',
  'album/0hf0fEpwluYYWwV1OoCWGX',
  'album/5ceAg32Kt8ta6U7qWYPesW',
  'album/3FJdPTLyJVPYMqQQUyb6lr',
  'album/6vvfbzMU2dkFQRJiP99RS4',
]

var interval = 600000

const doItAgain = async () => {
  await nightmare
    .goto('https://open.spotify.com/' + artists[getRandomInt(artists.length - 1, 0)])
    .forward()
    // .click('.artist-header .btn.btn-black')
    .wait(3000)
    .click('.tracklist-play-pause.tracklist-middle-align')
    .wait(5000)
    .click('.control-button.spoticon-shuffle-16')
}

const create = async () => {
  const tempmail = await nightmare
    .goto('https://www.tempmailaddress.com/')
    .wait('#email')
    .evaluate(() => {
      return document.getElementById('email').innerText
    })

  await nightmare
    .goto(url)
    .forward()
    .wait('#spotify-logo')
    .evaluate(() => {
      $.ajax({
        url: 'http://api.anti-captcha.com/createTask',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          clientKey: '2e7376e717a0ea614d93d6f921238352',
          task: {
            type: 'NoCaptchaTaskProxyless',
            websiteKey: '6LdaGwcTAAAAAJfb0xQdr3FqU4ZzfAc_QZvIPby5',
            websiteURL: window.location.href,
          }
        })
      })
        .done(function (response) {
          console.log(response)
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
                  $('body').append('<div id="tokenMicro" >' + response + '<div>')
                }
              });
          }, 10000)
        });
    })

  await nightmare
    .type('form input[name="email"]', tempmail)
    .type('form input[name="confirm_email"]', tempmail)
    .type('form input[name="password"]', tempmail)
    .type('form input[name="displayname"]', tempmail.split('@')[0])
    .type('form input[name="dob_day"]', getRandomInt(28))
    .select('form select[name="dob_month"]', month)
    .type('form input[name="dob_year"]', getRandomInt(32, 1963))
    .click('form input[id="register-male"]')

  await nightmare
    .wait('#tokenMicro')
    .wait(2000)
    .click('#register-button-email-submit')
    .wait('.welcome-message')
    .goto('https://www.tempmailaddress.com/')
    .forward()
    .wait('#schranka tr.hidden-md[data-href="2"]')
    .click('#schranka tr.hidden-md[data-href="2"]')
    .wait('#iframeMail')
    .enterIFrame('#iframeMail')
    .click('.call-to-action-button')
    .exitIFrame()
    .wait(5000)

  doItAgain()

  await setInterval(async () => {
    console.log('change')
    doItAgain()
  }, interval);

  // .goto('https://open.spotify.com/album/0hf0fEpwluYYWwV1OoCWGX')
  // // .wait('.tracklist-header__extra-buttons .btn.btn-transparent')
  // .click('.tracklist-header__extra-buttons .btn.btn-transparent')
  // .goto('https://open.spotify.com/collection/tracks')
  // .click('.tracklist-top-align')

  // .end()
  await nightmare
    .then(console.log)
    .catch(error => {
      console.error('Search failed:', error)
    })
}
create()
