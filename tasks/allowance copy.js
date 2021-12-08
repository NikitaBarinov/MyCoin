task("transferOwnership", "Transfer ownership to address")
.addParam("addressOwner", "The new owner's address")
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
    const data = myContract.methods.transferOwnership(
        taskArgs.addressOwner)
        .encodeABI();
    
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: myContract.options.address,
        from:owner.address,
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
