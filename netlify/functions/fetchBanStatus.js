const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const playerId = event.queryStringParameters.playerId;

  if (!playerId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing playerId' }),
    };
  }

  const apiKey = process.env.PUBG_API_KEY;
  const apiUrl = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const banType = data.data[0]?.attributes?.banType || 'Innocent';

    return {
      statusCode: 200,
      body: JSON.stringify({ banType }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
