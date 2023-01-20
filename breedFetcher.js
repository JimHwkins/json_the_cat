const request = require("request");

const fetchBreedDescription = (breedName, cbFunction) => {
  request(
    'https://api.thecatapi.com/v1/breeds/search?q=' + breedName, (error, response, body) => {
      if (error) {
        return cbFunction((error, null));
      }

      const data = JSON.parse(body);

      const breed = data[0];
      if (breed) {
        cbFunction(null, breed.description);
      } else {
        cbFunction(`Failed to find breed ${breedName}`);
      }
    }
  );
};


module.exports = { fetchBreedDescription };



