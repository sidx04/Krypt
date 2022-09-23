require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/z4WpA8UKgqnwbTYmrZu15yCOiijBKaRv',
      accounts: ['faa7a8b564ff991db7811a2cbd69d624c055cf3bf20df8839a7116004f7b5c76'],
    },
  },
};