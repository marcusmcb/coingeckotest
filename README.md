# coingeckotest
This is a repo that I've built to work with API data from CoinGecko via Node/Express.

As it sits, it's a simple Express app that queries current crypto price info from the CoinGecko API, pushes the returned data to a Mongo cluster, and returns the contents of the created "coins" collection to the base endpoint in Express.

Next up is to do something interesting with that data on the front end.  I'm thinking D3 to start.

Marcus McBride, 2021.