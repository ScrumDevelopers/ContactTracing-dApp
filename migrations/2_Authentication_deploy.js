var Auth = artifacts.require("./Authentication.sol");

module.exports = function(deployer) {
  deployer.deploy(Auth);
};
