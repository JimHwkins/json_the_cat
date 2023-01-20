const request = require('request');
const readline = require('readline');


const requestBreedDescription = (breed) => {
  request('https://api.thecatapi.com/v1/breeds/search?q=' + breed, (error, response, body) => {
    if (error) {
      console.log('Something went wrong: ', error);
      process.exit();
    }
  
    const data = JSON.parse(body);
  
    const breed = data[0];
    if (breed) {
      console.log(breed.description);
      process.exit();
    } else {
      console.log(`Failed to find breed ${breed}`);
      process.exit();
    }
  });
};

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const breedFetcher = function() {
  if (process.argv.length < 3) {
    read.question("Please provide a cat breed as argument: ", (answer) => {
      if (answer) {
        requestBreedDescription(answer);
      } else {
        breedFetcher();
      }
    });
    
  } else {
    const nameBreed = process.argv[2];
    requestBreedDescription(nameBreed);
  }
};

breedFetcher();



