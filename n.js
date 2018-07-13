const fs = require('fs');
let accounts = [
  'napster:holmark211@yahoo.com:mah1376',
  'napster:ctpr2310@aol.com:born1970',
  'napster:keve82383@yahoo.com:132330',
  'napster:kvogelgesang123@gmail.com:hidd3nsun',
  'napster:pix31@free.fr:130670',
  'napster:michael_kralovich@yahoo.com:czuchta1d',
  'napster:et1003@hotmail.com:benelana',
  'napster:dee20108@gmail.com:dorothy58',
  'napster:kristihostetter@yahoo.com:ldog099',
  'napster:fwmcdonnell@gmail.com:020281',
  'napster:dmayer@numericable.fr:doudou',
  'napster:martinez.damien@hotmail.com:chubby232',
  'napster:bravek@hotmail.com:sobrave1',
  'napster:dpowell7299@yahoo.com:1860sam',
  'napster:curley1300dns@aol.com:ryankelly',
  'napster:joel.deanna@comcast.net:ttownsue',
  'napster:barrazajm2@att.net:jb8445',
  'napster:bkirchhofer@t-online.de:vincenzo',
  'napster:fxl59948@mziqo.com:fxl59948@mziqo.com',
  'napster:g3n05g@gmail.com:e2ba0f48d6',
  'napster:wade707@gmail.com:wdk52792',
  'napster:mlewis2k@hotmail.com:ml1029',
  'napster:jillsevents@gmail.com:5swelbar',
  'napster:johndavisjr2002@yahoo.com:davis3456',
  'napster:lechantellh@hotmail.com:lonnie',
  'napster:katie9392@yahoo.com:Ross9392',
  'napster:crisco557@gmail.com:557508cd',
  'napster:missmichalkelly@yahoo.com:findmenow',
  'napster:kwash224@aol.com:candy24',
  'napster:duo.michael@numericable.fr:simon62790',
  'napster:hardin.nathan@gmail.com:moonraker11',
  'napster:jude@jbroussard.com:tapman01',
  'napster:drmatarasso@aol.com:surgeon',
  'napster:letsridetoday@gmail.com:mickey1234',
  'napster:lucky.rw90@gmail.com:princeyboy',
  'napster:chefswc@yahoo.com:swc2873',
  'napster:op_amy_meyer@hotmail.com:roxanne',
  'napster:jakereynolds86@yahoo.com:jr063086',
  'napster:kearlywi@gmail.com:benny1',
  'napster:mritter5@verizon.net:critter5',
  'napster:michael.voltz@numericable.fr:mich5482',
  'napster:cstella63@aol.com:winter11',
  'napster:lmashatt@gmail.com:yamayia1',
  'napster:designsbyshentell@gmail.com:frankie7',
  'napster:breen@breen.com:ellston',
  'napster:azziebear@comcast.net:sadie123',
  'napster:hughfix@optonline.net:lionel55',
  'napster:gailfitzgerald@msn.com:Fitzgerald1',
  'napster:ethanhiggy@yahoo.com:zoeycoco2',
  'napster:deborah@deborahgibbslaw.com:laslo1',
  'napster:ladybb@live.com:sianni',
  'napster:msjenq@gmail.com:Frankie01',
  'napster:lisaruggiero10@hotmail.com:jake3199'
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

    const push = () => {
      if (accounts.indexOf(account) < 0) {
        accounts.push(account)
      }
    }

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
        .wait(5000 + rand(2000))
        .type(inputs.username, login)
        .type(inputs.password, pass)
        .click(loginBtn)
        .wait(5000 + rand(2000))
        .goto(nAl)
        .wait(5000 + rand(2000))
        .click(playBtn)
        .wait(5000 + rand(2000))
        .click(shuffle)

      await console.log('in : ' + account)

      inter = setInterval(() => {
        try {
          let aUrl = album()

          while (aUrl === nAl) {
            aUrl = album()
          }

          nAl = aUrl
          // console.log('change : ' + nAl)
          nightmare
            .goto(nAl)
            .wait(5000 + rand(2000))
            .click(playBtn)
        }
        catch (e) {
          nightmare.screenshot(account)
          console.log(e)
        }
      }, 1000 * 60 * 5 + rand(1000 * 60 * 5));

      setTimeout(async () => {
        console.log('out : ' + account)
        push()
        clearInterval(inter)
        await nightmare.end()
        main(true)
      }, 1000 * 60 * 60 + rand(1000 * 60 * 60));

      if (accounts.length && !restart) {
        main()
      }
    }
    catch (e) {
      console.log("error", account, e)
      clearInterval(inter)
      await nightmare.end()
      if (account) {
        push()
        if (accounts.length) {
          main()
        }
      }
    }
  }, restart ? rand(1000 * 60 * 60) : 0);
}

main()