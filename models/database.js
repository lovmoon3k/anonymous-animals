var fs = require('fs');

var animals = JSON.parse(fs.readFileSync('./models/animals.json', 'utf8'));

module.exports = animals;
