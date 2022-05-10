require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const STAGING_ALCHEMY_KEY = process.env.STAGING_ALCHEMY_KEY;

const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: STAGING_ALCHEMY_KEY,
      accounts: [MUMBAI_PRIVATE_KEY],
    }
  }
};