const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("deployer is " + await deployer.address)
  const balance = await deployer.getBalance();
  console.log("balance is " + await balance)
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  console.log("deploying marketplace contract ")
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();
  console.log("deploying")

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))
  console.log("address is " + await data.address);
  console.log("abi is generating");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
