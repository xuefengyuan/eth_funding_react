import {fundingFactoryInstance, newFundingInstance} from "./instance";

let getFundingDetails = async (index) => {


    // index 1 : 所有的页面， 2: 我发起的页面， 3：我参与的页面
    let currentFundings = []
    if (index === 1) {

        currentFundings = await fundingFactoryInstance.methods.getAllFundings().call();
    } else if (index === 2) {
        currentFundings = await fundingFactoryInstance.methods.getCreatorFundings().call();
    } else if (index === 3) {
        currentFundings = await fundingFactoryInstance.methods.getSupportorFunding().call();
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

export {
    getFundingDetails,
}
