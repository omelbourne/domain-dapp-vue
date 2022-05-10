const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // We pass in "melbs" to the constructor when deploying
  const domainContract = await domainContractFactory.deploy("melbs");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // We're passing in a second variable - value
  let txn = await domainContract.register("testing", {
    value: hre.ethers.utils.parseEther("0.01")
  });
  await txn.wait();

  const address = await domainContract.getAddress("testing");
  console.log("Owner of domain melbs:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();