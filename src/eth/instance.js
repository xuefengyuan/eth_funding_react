import web3  from '../utils/InitWeb3';

let factoryAbi = [ { "constant": true, "inputs": [], "name": "platformManager", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "string" }, { "name": "_targetMoney", "type": "uint256" }, { "name": "_supportMoney", "type": "uint256" }, { "name": "_duration", "type": "uint256" } ], "name": "createFunding", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllFundings", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getSupportorFunding", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCreatorFundings", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
// 合约地址
let factoryAddress = '0x63BBA408a08B85EE2f02f8Cd360d2071e1920a64';

let fundingFactoryInstance = new web3.eth.Contract(factoryAbi,factoryAddress);

export {
    fundingFactoryInstance,
}