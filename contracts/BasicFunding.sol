pragma solidity ^0.4.24;
import './InvestorToFunding.sol';

contract CrowFunding{
    // 1. 管理员（项目发起人）
    address public manager;
    // 2. 项目名称
    string public projectName;
    // 3. 项目目标筹集金额
    uint256 public tragetMoney;
    // 4. 每个人支持多少钱
    uint256 public supportMoney;
    // 5. 项目结束时间
    uint256 public endTime;
    // 投资人参与投资的合约结构
    InvestorToFunding investorFunding;
    // 维护所有参与人的结构
    address[] investors;
    // 使用一个mapping来判断一个地址是否是投资人，这样可以快速识别是否有投票资格
    mapping(address=>bool) isInvestorMap;
    
    // 项目名称，目标金额，每个人可投资金额，项目时间
    constructor(string _projectName,uint256 _tragetMoney,uint256 _supportMoney,uint256 _duration, InvestorToFunding _investorFunding) public{
        manager = msg.sender;
        projectName = _projectName;
        tragetMoney = _tragetMoney;
        supportMoney = _supportMoney * 10 **18;
        endTime = block.timestamp + _duration; //当前时间+持续时间=终止时间
        investorFunding = _investorFunding;
    }
     
     // 投资方法
    function invest() payable public{
        // 判断投资金额
        require(msg.value == supportMoney);
        
        require(isInvestorMap[msg.sender]==false);
        
        investors.push(msg.sender);
        isInvestorMap[msg.sender] = true;
        investorFunding.joinFunding(msg.sender,this);
    }
    
    // 退款函数，由外面（前端）调用
    function refund() onlyManager public{
        for(uint256 i = 0; i<investors.length;i++){
            investors[i].transfer(supportMoney);
        }
        delete investors;
    }
    
    // 产品状态的枚举：0：进行中，1：已批准，2：已完成
    enum RequstStatus {
        Voting, Approved, Completed
    }
    
    struct Request{
        // 支付说明
        string purpose;
        // 要花多少钱
        uint256 cost;
        // 向谁支付的地址
        address seller;
        // 当前这个请求赞成的投票数量
        uint256 approveCount;
        // 请求状态
        RequstStatus status;
        
        // 记录投资人对这个请求的投票状态，只有未投票的才能投票，每人仅限一票
        mapping(address=>bool) isVotedMap;
    }
    
    // 所有的花费请求的集合
    Request[] public allRequests;
    
    // 花费请求 1、花费说明 2、要花多少钱 3、向谁花钱 
    function createRequest(string _purpose,uint256 _cost,address _seller) onlyManager public{
        Request memory req = Request({
            purpose:_purpose,
            cost:_cost,
            seller:_seller,
            approveCount:0,
            status:RequstStatus.Voting
        });
        
        allRequests.push(req);
    }
    
    
    // 1. 检验这个人是否投过票，若未投过，则允许投票，反之退出
    // 2. voteCount数据加1。
    // 3. 将该投票人在investorVotedMap映射中的值设置为true。
    // 投票函数
    function approveRequest(uint256 i) public{
        // 1.快速识别是否有投票资格
        require(isInvestorMap[msg.sender]);
        // 2.一定要使用storage类型，引用类型，否则无法修改allRequests里面的数据
        Request storage req  = allRequests[i];
        // 3.如果已经投过票，直接退出
        require(req.isVotedMap[msg.sender] == false);
        
        req.approveCount++;
        req.isVotedMap[msg.sender] = true;
    }
    
    // 花钱的函数
    function finalizeRequest(uint256 i) onlyManager public{
        Request storage req = allRequests[i];
         // 1.金额足够，> cost
        require(address(this).balance >= req.cost);
        // 2. 票数过半。
        require(req.approveCount *2 > investors.length);
        // 3. 执行转账，给卖家转账
        req.seller.transfer(req.cost);
        // 4. 更新request的状态
        req.status = RequstStatus.Completed;
    }
    
    // 判断是否是管理员
    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }
    
    //s 获取结束时间
    function getLeftTime() public view returns(uint256){
        return endTime - block.timestamp;
    }
    
    // 返回投资人的数量
    function getInvestorsCount() public view returns(uint256){
        return investors.length;
    }
    
    
    // 返回合约有多少钱
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    // 返回当前的所有花钱请求的数量
    function getRequestCount() public view returns(uint256){
        return allRequests.length;
    }
    
    // 返回花钱请求的信息
    function getRequestByIndex(uint256 i) public view returns(string,uint256,address,uint256,RequstStatus){
        Request memory req = allRequests[i];
        return (req.purpose, req.cost, req.seller, req.approveCount, req.status);
    }
    
    // 返回所有投资人的地址
    function getInvestors() public view returns(address[]){
        return investors;
    }
    
    
}