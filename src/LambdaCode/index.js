'use strict';
let _ = require('lodash');
let http = require('http');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context) => {
    const city = _.get(event, 'queryStringParameters.city');
    
    if (!city) {
        context.succeed("Please enter a city");
    }
    console.log('event:', event)
    console.log(city);
    var api_base_url = "http://api.openweathermap.org/data/2.5/weather?q=";
    api_base_url += city;
    api_base_url += "&APPID=38a5ea89e1ee220a5c7dbdbd04c9a67d";
    console.log(api_base_url);
    const req = http.request(api_base_url, (res) => {
        let body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Successfully processed HTTP response');
            // If we know it's JSON, parse it
            if (res.headers['content-type'].indexOf('application/json') !== -1) {
                console.log("JSON");
                console.log("unparsed body", body)
                body = JSON.parse(body);
                console.log(body);
                if (body.code == 401) {
                    console.log(res.statusCode);
                    context.succeed(body.code + " " + body.message);
                }
                else {
                    context.succeed(body.weather[0].main);   
                }
            }
        });
    });
    req.on('error', () => {
        console.log("Error");
    });
    req.end();
};