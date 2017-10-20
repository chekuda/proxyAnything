const express = require('express')
const request = require('request')

const app = express()

const port = process.env.PORT || 3000

const MAGIC_OBJECT = [
  {
    regexProxyFile: 'DPmisc\.min\.js', //Regex to match the file you want to proxy
    localFile: __dirname + '/public/localfile.js' //Local file you want to serve
  }, {
    regexProxyFile: 'chartbeat_mab.js', //Regex to match the file you want to proxy
    localFile: __dirname + '/public/localbat.js' //Local file you want to serve
  }
]

const getReplacementUrl = urlRequested => {
  return MAGIC_OBJECT.find(({ regexProxyFile }) => urlRequested.indexOf(regexProxyFile) !== -1)
}

app.use('/', (req, res, next) => {
  const urlToServe = getReplacementUrl(req.url)

    if(urlToServe) {
      console.log('>>>>>>>FILE REPLACED', req.url)
      console.log('>>>>>>>FILE SERVED', urlToServe.localFile)

      res.sendFile(urlToServe.localFile)
    } else {
      console.log(req.url)
      req.pipe(request(req.url)).pipe(res)
    }
})

app.listen(port)

console.log(`Listening on port ${ port }`)