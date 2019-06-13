const path = require('path')
const fs = require('fs')

const url = 'yidadaa.github.io/Issue-Blog'
const template = './dist/index.html'
const readme = './README.md'

/**
 * Read file and replace the content
 * @param {String} path 
 * @param {Function} cb 
 */
function readAndDoSomthing(path, cb) {
  fs.readFile(path, {
    encoding: 'utf-8',
    flag: 'r'
  }, (err, data) => {
    data = cb(data)
    fs.writeFile(path, Buffer.from(data), {
      flag: 'w+'
    }, (err, data) => {
      console.log('done')
    })
  })   
}

// replace index.html
readAndDoSomthing(template, (data) => {
  data = data.includes(url) ?
    data : data.replace(/\/static/g, `//${url}/dist/static`)  
  return data
})
