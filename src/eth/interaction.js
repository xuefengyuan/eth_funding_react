import {fundingFactoryInstance, newFundingInstance} from "./instance";

let getCreatorFundingDetails = async () => {

    // funding地址的数组
    let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();

    let detailsPromise = creatorFundingDetails.map(async function (fundingAddress) {
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
                let endTime = await newInstance.methods.endTime().call();
                let detail = {fundingAddress,manager, projectName, targetMoney, supportMoney, endTime}
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
    getCreatorFundingDetails,
}
