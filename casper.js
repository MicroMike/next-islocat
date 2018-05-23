var links = [];
var page = require('webpage').create();

// var log = function (obj) {
//     console.log('here')
//     Object.keys(obj).map(key => {
//         console.log(key + ':' + obj[key])
//     })
//     return
// }

console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = '';
console.log('Current user agent is ' + page.settings.userAgent);
page.open('https://www.spotify.com/fr/signup/', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        console.log('success');
        page.render('github.png');
        var ua = page.evaluate(function () {
            return document.getElementsByTagName('form');
        });
        for (key in ua) {
            console.log(ua[key].outerHTML);
        }
    }
    // console.log(page.content);
    phantom.exit();
});


// function getLinks() {
//     var links = document.querySelectorAll('h3 a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.textContent;
//     });
// }

// page.start('https://www.spotify.com/fr/signup/', function() {
//     // Wait for the page to be loaded
//     this.echo('here')
//     this.waitForSelector('form#js-register-with-email');
// });

// page.then(function() {
//     this.echo('here 2')
//     // search for 'casperjs' from google form
//     this.fill('form#js-register-with-email', {
//       email: 'nachshon.jaxyn@0clock.net',
//       confirm_email: 'nachshon.jaxyn@0clock.net',
//       password: 'nachshon.jaxyn@0clock.net',

//     }, true);
// });

// page.then(function() {
//     // aggregate results for the 'casperjs' search
//     links = this.evaluate(getLinks);
//     // now search for 'phantomjs' by filling the form again
//     this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
// });

// page.then(function() {
//     // aggregate results for the 'phantomjs' search
//     links = links.concat(this.evaluate(getLinks));
// });

// page.run(function() {
//     // echo results in some pretty fashion
//     this.echo(links.length + ' links found:');
//     this.echo(' - ' + links.join('\n - ')).exit();
// });