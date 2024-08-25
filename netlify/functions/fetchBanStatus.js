const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const playerId = event.queryStringParameters.playerId;
    const apiUrl = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerId}`;
    const apiKey = process.env.API_KEY;  // 从环境变量中获取 API 密钥

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: '请求失败' })
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: '服务器错误' })
        };
    }
};
