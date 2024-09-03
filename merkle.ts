import { StandardMerkleTree } from "@openzeppelin/merkle-tree"; //Import the merkle-tree js library from openzeppelin.
import fs from "fs"; //Import file system.
import csv from "csv-parser"; //Import csv-parser for ready csv

const values: any = []; //Array to save values from csv
fs.createReadStream('airdrop.csv') //Read csv file called airdrop.csv
  .pipe(csv())
  .on('data', (row) => {
    // Convert the amount to a string if necessary
    values.push([row.address, row.amount]);
  })
  .on('end', () => {
    // Once CSV parsing is complete, create the Merkle Tree
    const tree = StandardMerkleTree.of(values, ["address", "uint256"]);
    console.log('Merkle Root:', tree.root);
    fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
  });

  function generateProof(){
    const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")));
    for (const [i, v] of tree.entries()) {
    if (v[0] === '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2') {
        const proof = tree.getProof(i);
        console.log('Value:', v);
        console.log('Proof:', proof);
    }
    }
  }

  generateProof();


//   Value: [ '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', '1000000000000000000' ]
//   Proof: ["0x78dbf07211773dce83dfb48297a3c618c195c12c2aeb5004bdfe05bd5497aacc","0xde3249f26d32cfe204e0ed813456d20e74c33307bd8e71946c7c50c0b900df51","0x716caf480389aa3500e4248606549ebce74e0ec01db2d3c247c81cfbcd33b9d3"]
//   Merkle Root: 0x2da0f0749e511349b69ba1adf37a2c38702c54989b11d55a6f29a91600be968a