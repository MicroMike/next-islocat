const accounts = [
  'napster:mlewis2k@hotmail.com:ml1029',
  'napster:fxl59948@mziqo.com:fxl59948@mziqo.com',
  // 'tidal:mmussett@me.com:f1rest0rm',
  // 'tidal:vidar.moe@gmail.com:Grunch',
  // 'spotify:vera.westra@hotmail.com:boffy05',
  'spotify:niania@live.com:nia1996',
  'spotify:nathan.dickey01@gmail.com:nathan01',
  'spotify:zozopotter@hotmail.com:Lestat456',
  'spotify:eusum@gmx.de:geheim99',
  'spotify:lucy.mann@loewygroup.com:sparkle68',
  'spotify:stevenhewitt@outlook.com:panavia',
  'spotify:zuziaa145@wp.pl:kajaa145',
  'spotify:coreyfyock@hotmail.com:9110555',
  'spotify:marcus.croskey@live.com:jelly253',
  'spotify:turn22@comcast.net:hkctirt07',
  'spotify:jayse_24@hotmail.co.uk:dillon22',
  'spotify:mmdurrani@gmail.com:karachi3',
  'spotify:virginie123@gmail.com:weliketoparty',
  'spotify:p_le@yahoo.com:hp8jmpqr',
  'spotify:Savagewildcat@excite.com:pussycat'
]

const rand = (max, min) => {
  return Math.floor(Math.random() * Math.floor(max) + (typeof min !== 'undefined' ? min : 0));
}

for (account of accounts) {
  const Nightmare = require('nightmare')
  const nightmare = Nightmare({
    electronPath: require('electron'),
    // openDevTools: {
    //   mode: 'detach'
    // },
    alwaysOnTop: false,
    waitTimeout: 60000,
    show: true,
    typeInterval: 300,
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
      plugins: true,
      experimentalFeatures: true
    }
  })

  account = account.split(':')
  const player = account[0]
  const login = account[1]
  const pass = account[2]

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
      shuffle = '.repeat-button'
      inputs.username = 'form input[name="username"]'
      inputs.password = 'form input[name="password"]'
      break
    default:
  }

  const album = () => albums[rand(albums.length)]

  nightmare
    .goto(url)
    .wait(2000 + rand(2000))
    .type(inputs.username, login)
    .type(inputs.password, pass)
    .click(loginBtn)
    .wait(2000 + rand(2000))
    .goto(album())
    .wait(2000 + rand(2000))
    .click(playBtn)
    .wait(2000 + rand(2000))
    .click(shuffle)

  setInterval(async () => {
    const nAl = album()
    console.log('change : ' + nAl)
    await nightmare
      .goto(nAl)
      .wait(2000 + rand(2000))
      .click(playBtn)
  }, 1000 * 60 * 5 + rand(1000 * 60 * 5));

  nightmare.catch(() => {

  })
}