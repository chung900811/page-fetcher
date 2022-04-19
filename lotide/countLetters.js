const assertEqual = require("./assertEqual")

const countLetters = function(string) {
  const results = {};
  for (const letter of string) {
    if (results[letter]) {
      results[letter] += 1;
    } else if (letter !== " ") {
      results[letter] = 1;
    }
  }
  return results;
};

module.exports = countLetters
