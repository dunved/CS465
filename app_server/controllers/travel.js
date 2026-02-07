const request = require('request');

const apiOptions = {
  server: 'http://localhost:3001'
};

const _renderTravelPage = (req, res, responseBody) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    trips: responseBody
  });
};

const travel = (req, res) => {
  const path = '/api/trips';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      return res.status(500).send(err);
    }
    _renderTravelPage(req, res, body);
  });
};

module.exports = {
  travel
};
