var fs = require('fs');

var animals = JSON.parse(fs.readFileSync('./model/animals.json', 'utf8'));

module.exports = animals;