import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const base_url =
    "https://ipfs.io/ipfs/QmfRgQHEe47FqC9hyKp118XWF3UJcVzNEvNuREbczaiGtd/";

  const images_base_url =
    "https://ipfs.io/ipfs/QmdVCuEoJgCSTwUdNUWyFDC8gK1onJG4Nxks1EG2PdvC5S/";

  const Contract = await ethers.getContractFactory("Ayeolakenny");
  const contract = await Contract.deploy(
    "Ayeolakenny NFT",
    "AKN",
    base_url,
    images_base_url
  );

  await contract.deployed();

  const address = JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile("./src/abis/contractAddress.json", address, "utf-8", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Deployed contract address", contract.address);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
