const accounts = [
  'spotify:Sundin84@hotmail.com:turn2301',
  'spotify:tylerbonafe@hotmail.com:Jank8745',
  'spotify:acortes1337@gmail.com:Harley1234',
  'spotify:jonathan_ro_alfa@outlook.com:Nerfroal9816',
  'spotify:madkeene:friend12',
  'spotify:natashaell@gmail.com:R3gist3r',
  'spotify:Savagewildcat@excite.com:pussycat',
  'spotify:p_le@yahoo.com:hp8jmpqr',
  'spotify:mmdurrani@gmail.com:karachi3',
  'spotify:jayse_24@hotmail.co.uk:dillon22',
  'spotify:coreyfyock@hotmail.com:9110555',
  'spotify:lucy.mann@loewygroup.com:sparkle68',
  'spotify:eusum@gmx.de:geheim99',
  'spotify:zozopotter@hotmail.com:Lestat456',
  'spotify:foreverscrapbooking01@yahoo.com:3sweetie',
  'spotify:niania@live.com:nia1996',
  'spotify:laurensmom_us@yahoo.com:matt2laur',
  'spotify:vera.westra@hotmail.com:boffy05',
  'spotify:jasonduran53@gmail.com:samsung29',
  'spotify:robbin.messerli@gmail.com:3512west',
  'spotify:steveandrews1@talktalk.net:jsbach12',
  'spotify:ve7dpj@gmail.com:direct21',
  'spotify:nat.sed@gmail.com:nat1787',
  'spotify:huntermoore7596@live.com:sweetpea13',
  'spotify:davidfbower@hotmail.com:gorams',
  'spotify:ric817@msn.com:domino22',
  'spotify:mike.malchow1@gmail.com:malcma01',
  'spotify:with.the.worst.intentions@gmail.com:issues',
  'spotify:yohan.veyssiere@yahoo.fr:goldorak',
  'spotify:pyrofreak042287@yahoo.com:kevin42287',
  'spotify:christosmakris83@gmail.com:Epsilon5',
  'spotify:hv_macke@hotmail.com:skatefreddy',
  'spotify:ronartist01@gmail.com:federal1',
  'spotify:duragaghee@yahoo.com:m00simus',
  'spotify:davidfortin007@hotmail.com:skidoo122',
  'spotify:michael.babik@gmail.com:munich26',
  'spotify:yvette.tournier@gmail.com:BW04thuis',
  'spotify:courtwilkinson@gmail.com:sail7348',
  'spotify:mak.hashi@gmail.com:makris1',
  'spotify:juliewithers@yahoo.com:horses',
  'spotify:austin.thompson@gmail.com:401ndCHS',
  'spotify:harrym1@blueyonder.co.uk:chocolate',
  'spotify:popcornandakitkat@hotmail.com:Jess5377',
  'spotify:kaye0628@gmail.com:bandit1990',
  'spotify:ruder@lichtpunkt.cc:180667',
  'spotify:tm.landmann@googlemail.com:encore12',
  'spotify:amg806@yahoo.com:bethanie1',
  'spotify:wernicke@gmail.com:cep05327',
  'spotify:smcgruder@yahoo.com:reddog30',
  'spotify:Ballers1993@yahoo.com:player1993',
  'spotify:robfroom@gmail.com:booboo3',
  'spotify:evernellis@gmail.com:mo06192004',
  'spotify:auzziedon@gmail.com:215london',
  'spotify:newgard1021@yahoo.com:spreewell8',
  'spotify:david.dygowski@gmail.com:tippmann98',
  'spotify:dtrichg@yahoo.com:4456ZOOM',
  'spotify:quimper2001@hotmail.com:ness2005',
  'spotify:monacan@gmail.com:t6g8qdgf',
  'spotify:davespalds@hotmail.co.uk:chill0274',
  'spotify:stephanfranke2010@googlemail.com:selina74',
  'spotify:dundic.ivan@gmail.com:Chico!985',
  'spotify:eahutz@gmail.com:rufus22',
  'spotify:davidcastagnetoa@gmail.com:davidc',
  'spotify:dave20o9@yahoo.com:megman22',
  'spotify:svalovanie@msn.com:trcvn71',
  'spotify:tddp22@hotmail.com:dumbass22',
  'spotify:kc.rkitek@hotmail.com:cruzlaruz',
  'spotify:Linzee1290@yahoo.com:1livewire',
  'spotify:natashaell@gmail.com:R3gist3r',
  'spotify:Savagewildcat@excite.com:pussycat',
  'spotify:p_le@yahoo.com:hp8jmpqr',
  'spotify:mmdurrani@gmail.com:karachi3',
  'spotify:jayse_24@hotmail.co.uk:dillon22',
  'spotify:coreyfyock@hotmail.com:9110555',
  'spotify:lucy.mann@loewygroup.com:sparkle68',
  'spotify:eusum@gmx.de:geheim99',
  'spotify:zozopotter@hotmail.com:Lestat456',
  'spotify:foreverscrapbooking01@yahoo.com:3sweetie',
  'spotify:niania@live.com:nia1996',
  'spotify:laurensmom_us@yahoo.com:matt2laur',
  'spotify:vera.westra@hotmail.com:boffy05',
  'spotify:jasonduran53@gmail.com:samsung29',
  'spotify:robbin.messerli@gmail.com:3512west',
  'spotify:steveandrews1@talktalk.net:jsbach12',
  'spotify:ve7dpj@gmail.com:direct21',
  'spotify:nat.sed@gmail.com:nat1787',
  'spotify:huntermoore7596@live.com:sweetpea13',
]

const rand = (max, min) => {
  return Math.floor(Math.random() * Math.floor(max) + (typeof min !== 'undefined' ? min : 0));
}

const fs = require('fs');

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

      const date = await nightmare
        .goto(url)
        .wait(4000 + rand(2000))
        .type(inputs.username, login)
        .type(inputs.password, pass)
        .click(loginBtn)
        .wait(4000 + rand(2000))
        // .goto(nAl)
        .goto('https://www.spotify.com/account/overview/')
        .wait(4000 + rand(2000))
        .evaluate(() => {
          return $('.subscription-status .recurring-date').text()
        })
      // .click(playBtn)
      // .wait(4000 + rand(2000))
      // .click(shuffle)

      await console.log('in : ' + account)

      fs.appendFile('spotifyWhiteList.txt', account + '/' + date + '\r\n', function (err) {
        if (err) return console.log(err);
      });

      // inter = setInterval(async () => {
      //   let aUrl = album()

      //   while (aUrl === nAl) {
      //     aUrl = album()
      //   }

      //   nAl = aUrl
      //   // console.log('change : ' + nAl)
      //   await nightmare
      //     .goto(nAl)
      //     .wait(4000 + rand(2000))
      //     .click(playBtn)
      // }, 1000 * 60 * 5 + rand(1000 * 60 * 5));

      // setTimeout(async () => {
      // console.log('out : ' + account)
      // clearInterval(inter)
      await nightmare.end()
      // accounts.push(account)
      // main(true)
      // }, 1000 * 60 * 60 + rand(1000 * 60 * 60));

      if (accounts.length && !restart) {
        main()
      }
    }
    catch (e) {
      console.log("error", account)
      accounts.push(account)
      // clearInterval(inter)
      await nightmare.end()
      setTimeout(() => {
        if (accounts.length) {
          main()
        }
      }, 1000 * 60 * 5);
    }
  }, restart ? rand(1000 * 60 * 60) : 0);
}

main()