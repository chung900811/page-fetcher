const fs = require('fs');
const URL = process.argv[2];
const filePath = process.argv[3];
const request = require('request');

request(`${URL}`, (error, response, body) => {
  saveFile(response, body)
});

const saveFile = function(statusCode, data) {
  fs.writeFile(`${filePath}`, data, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${data.length} bytes to ${filePath}`)
  });
}
