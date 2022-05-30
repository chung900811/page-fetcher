const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {
  if (error) {
    console.log("There was an area retrieving data from the provided URL")
    process.exit();
  }
  fs.stat(args[1], (err, stats) => {
    if (err) {
      fs.writeFile(args[1], body, (err) => {
        if (err) {
          console.log("Local path file was invalid")
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`)
        rl.close();
      });
    }
    if (stats !== undefined) {
      rl.question(`${args[1]} already exists, type Y then enter to overwrite the file or N and then enter to cancel \n`, answer => {
        if (answer === 'Y' || answer === 'y') {
          rl.close();
          fs.writeFile(args[1], body, (err) => {
            if (err) {
              console.log("Local path file was invalid")
            }
            console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`)
          });
        }
        if (answer === 'N' || answer === 'n') {
          process.exit();
        }
      })
    }
  })
})
