task("transfer", "Transfer coins to address")
.addParam("addressSpender", "The client account address")
.addParam("value", "A value of coins")
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
const data = myContract.methods.transfer(
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
  [`0x${process.env.PRIVATE_KEY}`]
);

const receipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
  
  console.log('Transaction hash:',receipt.transactionHash);
});

