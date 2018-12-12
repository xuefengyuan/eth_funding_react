pragma solidity ^0.4.24;
// 这个合约是维护着全局所有参与人所参与的所有众筹合约
contract InvestorToFunding{
    // 所有的参与人所参与的所有合约
    mapping(address => address[]) investorToFundingMap;
    
    // 添加指定参与人所参与的数组,1、参与人地址，2、所投资的合约地址
    function joinFunding(address inverstor,address fundingAddress) public{
        investorToFundingMap[inverstor].push(fundingAddress);
    }
    
    // 返回指定参与人所参与的合约地址数组，1、参与人地址
    function getFundingBy(address inverstor) public view returns(address[]){
        return investorToFundingMap[inverstor];
    }
}
