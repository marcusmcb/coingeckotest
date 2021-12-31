# coingeckotest
This is a repo that I've built to work with API data from CoinGecko via Node/Express.

As it sits, it's a simple Express app that queries current crypto price info from the CoinGecko API, pushes the returned data to a Mongo cluster, and returns the contents of the created "coins" collection to the base endpoint in Express.

There's a front-end built with React that returns a simple flexbox UI with the sample crypto data.

After cloning and NPM install, run nodemon server.js from the root dir and, when ready, npm start from the client dir.

Marcus McBride, 2021.