const Nightmare = require('nightmare')
const nightmare = Nightmare({
  electronPath: require('electron'),
  // openDevTools: {
  //   mode: 'detach'
  // },
  alwaysOnTop: false,
  waitTimeout: 600000,
  show: true,
  typeInterval: 300,
  webPreferences: {
    webSecurity: false,
    allowRunningInsecureContent: true,
    plugins: true,
    experimentalFeatures: true
  }
})

let stop = false

const main = async () => {
  await nightmare
    .goto('https://www.netflix.com')

  setInterval(async () => {
    await nightmare
      .click('.button-nfplayerPause')
      .wait(1000 * 60 * 5)
      .click('.button-nfplayerPlay')
  }, 1000 * 60 * 60)

  setTimeout(async () => {
    stop = true
    await nightmare
      .goto('https://www.netflix.com/watch/80045949')
  }, 1000 * 60 * 60 * 20);

  const fct = async () => {
    if (stop) { return }

    await nightmare
      .goto('https://www.netflix.com/watch/60031258')
      .wait(1000 * 60 * 100)
      .click('.button-bvuiExit')
      .wait(5000)
      .goto('https://www.netflix.com/watch/70301367')
      .wait(1000 * 60 * 130)
      .click('.button-bvuiExit')
      .wait(5000)
      .goto('https://www.netflix.com/watch/80195049')
      .wait(1000 * 60 * 100)
      .click('.button-bvuiExit')
      .wait(5000)
      .goto('https://www.netflix.com/watch/70039185')
      .wait(1000 * 60 * 100)
      .click('.button-bvuiExit')
      .wait(5000)
      .goto('https://www.netflix.com/watch/70117305')
      .wait(1000 * 60 * 110)
      .click('.button-bvuiExit')
      .wait(5000)
  }

  fct()

  setInterval(fct, 1000 * 60 * 100 + 1000 * 60 * 130 + 1000 * 60 * 100 + 1000 * 60 * 100 + 1000 * 60 * 110)

  nightmare
    .catch()
}

main()