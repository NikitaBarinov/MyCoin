task("approve", "To get alloance of address")
.addParam("addressSpender", "The account spender address")
.addParam("value", "A value to allow")
.setAction(async (taskArgs) => {
const Web3 = require('web3');
const web3 = new Web3(process.env.API_URL);

var fs = require('fs');
var jsonFile = "frontend/src/Token.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
var abiAdr = parsed.address;

var myContract = new web3.eth.Contract( abi,abiAdr);
const networkId = await web3.eth.net.getId();
const gasPrice = await web3.eth.getGasPrice();
const data = myContract.methods.approve(
    taskArgs.addressSpender,
    taskArgs.value)
    .encodeABI();

const signedTx = await web3.eth.accounts.signTransaction(
  {
    to: myContract.options.address,
    from:'0x302c91F513bdBbA555D189C1Bc6c59cB6A6121A5',
    data,
    gas:6000000,
    gasPrice,
    chainId: networkId
  },
  "fcca5167397b99613126fa9eb9b4299ced4f1d83b36b52bba8a5af1b568eb57f"
);

const receipt = await web3.eth.sendSignedTransaction(
  signedTx.rawTransaction
);

console.log('Transaction hash:',receipt.transactionHash);
});


