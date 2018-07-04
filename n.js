const accounts = [
  'napster:fxl59948@mziqo.com:fxl59948@mziqo.com',
  'napster:g3n05g@gmail.com:e2ba0f48d6',
  'napster:wade707@gmail.com:wdk52792',
  'napster:mlewis2k@hotmail.com:ml1029',
  'napster:jillsevents@gmail.com:5swelbar',
  'napster:johndavisjr2002@yahoo.com:davis3456',
  'napster:kwash224@aol.com:candy24',
  'napster:lechantellh@hotmail.com:lonnie',
  'napster:katie9392@yahoo.com:Ross9392',
  'napster:crisco557@gmail.com:557508cd',
  'napster:missmichalkelly@yahoo.com:findmenow',
  'napster:kwash224@aol.com:candy24',
  'napster:duo.michael@numericable.fr:simon62790',
  'napster:hardin.nathan@gmail.com:moonraker11',
  'napster:jude@jbroussard.com:tapman01',
  'napster:drmatarasso@aol.com:surgeon',
  // 'napster:d_ott4@hotmail.com:bently44',
  // 'napster:jamesandrewbarber@gmail.com:hdtysm69',
  // 'napster:chisox07@gmail.com:destini08',
  // 'napster:bryclark9@gmail.com:santa1234',
  // 'napster:melymel10@yahoo.com:meligio1',
  // 'napster:pop.and.disco@gmail.com:101289',
  // 'napster:a.giovanna87@gmail.com:napoli875154',
  // 'napster:arogers0413@gmail.com:bananas3',
  // 'napster:inkbound72@gmail.com:tattooking',
  // 'tidal:mmussett@me.com:f1rest0rm',
  // 'tidal:vidar.moe@gmail.com:Grunch',
]

const rand = (max, min) => {
  return Math.floor(Math.random() * Math.floor(max) + (typeof min !== 'undefined' ? min : 0));
}

const main = async (restart) => {
  setTimeout(async () => {
    let account = accounts.shift()
    let inter
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({
      electronPath: require('electron'),
      // openDevTools: {
      //   mode: 'detach'
      // },
      alwaysOnTop: false,
      waitTimeout: 10000,
      show: true,
      typeInterval: 300,
      webPreferences: {
        webSecurity: false,
        allowRunningInsecureContent: true,
        plugins: true,
        experimentalFeatures: true
      }
    })

    try {
      accountInfo = account.split(':')
      const player = accountInfo[0]
      const login = accountInfo[1]
      const pass = accountInfo[2]

      let albums
      let inputs = {
        username: '#username',
        password: '#password'
      }
      let url
      let loginBtn
      let playBtn
      let shuffle

      switch (player) {
        case 'napster':
          url = 'https://app.napster.com/login/'
          loginBtn = '.signin'
          albums = [
            'https://app.napster.com/artist/honey/album/just-another-emotion',
            'https://app.napster.com/artist/yokem/album/boombeats',
            'https://app.napster.com/artist/hanke/album/new-york-story',
          ]
          playBtn = '.track-list-header .shuffle-button'
          shuffle = '.repeat-button'
          break
        case 'tidal':
          url = 'https://listen.tidal.com/login'
          loginBtn = '.js-login-form button'
          albums = [
            'https://listen.tidal.com/album/88716570',
          ]
          playBtn = '...'
          break
        case 'spotify':
          url = 'https://spotify.com/login'
          loginBtn = '#login-button'
          albums = [
            'https://open.spotify.com/album/0hf0fEpwluYYWwV1OoCWGX',
            'https://open.spotify.com/album/3FJdPTLyJVPYMqQQUyb6lr',
            'https://open.spotify.com/album/6vvfbzMU2dkFQRJiP99RS4',
          ]
          playBtn = '.tracklist-play-pause.tracklist-middle-align'
          shuffle = '.spoticon-shuffle-16'
          inputs.username = 'form input[name="username"]'
          inputs.password = 'form input[name="password"]'
          break
        default:
      }

      const album = () => albums[rand(albums.length)]
      let nAl = album()

      await nightmare
        .goto(url)
        .wait(4000 + rand(2000))
        .type(inputs.username, login)
        .type(inputs.password, pass)
        .click(loginBtn)
        .wait(4000 + rand(2000))
        .goto(nAl)
        .wait(4000 + rand(2000))
        .click(playBtn)
        .wait(4000 + rand(2000))
        .click(shuffle)

      await console.log('in : ' + account)

      inter = setInterval(async () => {
        let aUrl = album()

        while (aUrl === nAl) {
          aUrl = album()
        }

        nAl = aUrl
        // console.log('change : ' + nAl)
        await nightmare
          .goto(nAl)
          .wait(4000 + rand(2000))
          .click(playBtn)
      }, 1000 * 60 * 5 + rand(1000 * 60 * 5));

      setTimeout(async () => {
        console.log('out : ' + account)
        clearInterval(inter)
        await nightmare.end()
        accounts.push(account)
        main(true)
      }, 1000 * 60 * 60 + rand(1000 * 60 * 60));

      if (accounts.length && !restart) {
        main()
      }
    }
    catch (e) {
      console.log("error", account)
      accounts.push(account)
      clearInterval(inter)
      await nightmare.end()
      if (accounts.length) {
        main()
      }
    }
  }, restart ? rand(1000 * 60 * 60) : 0);
}

main()