import {fundingFactoryInstance, newFundingInstance} from "./instance";
import web3 from "../utils/InitWeb3";

// 获取对应的众筹合约信息
let getFundingDetails = async (index) => {


    // index 1 : 所有的页面， 2: 我发起的页面， 3：我参与的页面

    let accounts = await web3.eth.getAccounts();
    console.log('accounts : ', accounts[0])

    let currentFundings = []
    if (index === 1) {

        currentFundings = await fundingFactoryInstance.methods.getAllFundings().call({
            from: accounts[0],
        });
    } else if (index === 2) {
        currentFundings = await fundingFactoryInstance.methods.getCreatorFundings().call({
            from: accounts[0],
        });
    } else if (index === 3) {
        currentFundings = await fundingFactoryInstance.methods.getSupportorFunding().call({
            from: accounts[0],
        });
    }

    // funding地址的数组

    let detailsPromise = currentFundings.map(async function (fundingAddress) {
        console.log(fundingAddress)

        return new Promise(async (resolve, reject) => {
            // 初始化一个新的Funding实例
            // 每个地址遍历的时候，都创建一个新的实体，避免了之前的地址覆盖
            try {
                let newInstance = newFundingInstance();
                newInstance.options.address = fundingAddress;

                let manager = await newInstance.methods.manager().call();
                let projectName = await newInstance.methods.projectName().call();
                let targetMoney = await newInstance.methods.targetMoney().call();
                let supportMoney = await newInstance.methods.supportMoney().call();
                let leftTime = await newInstance.methods.getLeftTime().call();

                let balance = await newInstance.methods.getBalance().call();

                let investorCount = await newInstance.methods.getInvestorsCount().call();


                let detail = {
                    fundingAddress,
                    manager,
                    projectName,
                    targetMoney,
                    supportMoney,
                    leftTime,
                    balance,
                    investorCount
                }

                // console.table(detail);
                resolve(detail)
            } catch (e) {
                reject(e)
            }
        });
    });
    // 把多个promise处理成一个promise
    let detailInfo = Promise.all(detailsPromise);
    return detailInfo;
}

// 创建众筹合约
let createFunding = (projectName, targetMoney, supportMoney, duration) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await web3.eth.getAccounts();
            // 调用合约创建众筹函数
            let res = await fundingFactoryInstance.methods.createFunding(projectName, targetMoney, supportMoney, duration).send({
                from: account[0],
            });
            resolve(res);
        } catch (e) {
            reject(e);
        }
    })
}

// 参与众筹函数
let handleInvestFunc = (fundingAddress, supportMoney) => {

    return new Promise(async (resolve, reject) => {

        try {
            // 创建合约实例
            let fundingInstance = newFundingInstance();

            // 填充合约地址
            fundingInstance.options.address = fundingAddress
            let accounts = await web3.eth.getAccounts();
            let res = await fundingInstance.methods.invest().send({
                from: accounts[0],
                value: supportMoney,
            })
            resolve(res)
        } catch (e) {
            reject(e)
        }

    })


}

// 创建花费请求，1、合约地址，2、花费说明，3、花多少钱，4、商家地址
let createRequest = (fundingAddress,purpose, cose, seller) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newInstance = newFundingInstance();
            newInstance.options.address = fundingAddress;

            let account = await web3.eth.getAccounts();
            // 调用合约创建众筹函数
            let res = await newInstance.methods.createRequest(purpose, cose, seller).send({
                from: account[0],
            });
            resolve(res);
        } catch (e) {
            reject(e);
        }
    })
}

// 获取众筹的所有花费信息
let showRequest = (fundingAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await web3.eth.getAccounts();
            let fundingContract = newFundingInstance();
            fundingContract.options.address = fundingAddress;

            // 先获取花费请求数量
            let requestCount = await fundingContract.methods.getRequestsCount().call({
                from:account[0],
            });

            let requestDateils = [];
            // 遍历请求数量，依次获取每一个请求的详情，添加到数组中，最后使用promise返回
            for(let i = 0;i<requestCount;i++){
                let requestDetail = await fundingContract.methods.getRequestByIndex(i).call({
                    from:account[0],
                });
                requestDateils.push(requestDetail);
            }
            resolve(requestDateils);
        } catch (e) {
            reject(e);
        }
    })
}

// 批准合约的花费请求函数
let approveRequest = (fundingAddress,index) => {

    return new Promise(async (resolve, reject) => {
        try {
            const accounts = await web3.eth.getAccounts();
            const contract = newFundingInstance()
            contract.options.address = fundingAddress;

            const result = await contract.methods.approveRequest(index).send({
                from: accounts[0],
            });

            console.log('result :', result);

            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
}

// 花钱了
let finalizeRequest = (fundingAddress,index) => {

    return new Promise(async (resolve, reject) => {
        try {
            const accounts = await web3.eth.getAccounts();
            const contract = newFundingInstance()
            contract.options.address = fundingAddress;

            const result = await contract.methods.finalizeRequest(index).send({
                from: accounts[0],
            });

            console.log('result :', result);

            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
}

export {
    getFundingDetails,
    createFunding,
    handleInvestFunc,
    createRequest,
    showRequest,
    approveRequest,
    finalizeRequest,
}
