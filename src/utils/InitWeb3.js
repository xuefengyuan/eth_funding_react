// 1. 引入Web3
let Web3 = require('web3');

console.log('window web3 :', window.web3.version) //0.20版本

// 2. new 一个web3实例,并设置网络
let web3 = new Web3(window.web3.currentProvider);

console.log('自己的 web3：',web3.version);
// web3.setProvider(window.web3.currentProvider);
// 导出
export default web3;
