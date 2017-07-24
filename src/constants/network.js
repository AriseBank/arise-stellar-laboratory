import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  available: {
    test: {
      url: 'http://stellar-api.arisebank.net',
      networkObj: new Network(Networks.TESTNET),
    },
    public: {
      url: 'http://stellar-api.arisebank.net',
      networkObj: new Network(Networks.PUBLIC),
    }
  },
  defaultName: 'test',
};
export default NETWORK;
