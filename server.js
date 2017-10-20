const express = require('express')
const request = require('request')
const fs = require('fs')

const app = express()

const port = process.env.PORT || 3000
const ENV = process.argv[2]

const magicObject = [
  {
    regexProxyFile: 'DPmisc\.min\.js', //Regex to match the file you want to proxy
    localFile: __dirname + '/public/localfile.js' //Local file you want to serve
  }, {
    regexProxyFile: 'bat.js', //Regex to match the file you want to proxy
    localFile: __dirname + '/public/localbat.js' //Local file you want to serve
  }
]

/*******************
  Devices for test
*********************/

const DEVICES = {
  local: {
    url: '/proxy',
    rgxremove: '/?url='
  },
  remote: {
    url: '/',
    rgxremove: ''
  }
}

const getUrlIfMatch = (urlRequested) => {
  return magicObject.find(({ regexProxyFile }) => urlRequested.indexOf(regexProxyFile) !== -1)
}

app.use(DEVICES[ENV].url, function(req, res) {
  const url = req.url.replace(DEVICES[ENV].rgxremove,'')
  const urlToServe = getUrlIfMatch(url)

    if(urlToServe && fs.existsSync(urlToServe.localFile)) {
      console.log('>>>>>>>FILE REPLACED', url)
      console.log('>>>>>>>FILE SERVED', urlToServe.localFile)

      res.sendFile(urlToServe.localFile)
    } else {
      console.log(url)
      req.pipe(request(url)).pipe(res)
    }
})

app.listen(port)

console.log(`Listening on port ${ port }`)