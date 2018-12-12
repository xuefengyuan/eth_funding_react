import React, {Component} from 'react';
import {fundingFactoryInstance, newFundingInstance} from '../../eth/instance';
import {getCreatorFundingDetails} from "../../eth/interaction";
import CardList from "../common/CardList";

class CreatorFundingTab extends Component {

    state = {
        creatorFundingDetails: [],
    }

    async componentWillMount() {
        // funding地址的数组
        // let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();
        let creatorFundingDetails = await getCreatorFundingDetails();
        // console.table(creatorFundingDetails)

       /* let dtails = creatorFundingDetails.map(async function (funddingAddress) {
            console.log(funddingAddress)
            // 初始化一个新的Funding实例
            // 每个地址遍历的时候，都创建一个新的实体，避免了之前的地址覆盖
            let newInstance = newFundingInstance();
            newInstance.options.address = funddingAddress;

            let manager  = await newInstance.methods.manager().call();
            let projectName = await newInstance.methods.projectName().call();
            let targetMoney = await newInstance.methods.targetMoney().call();
            let supportMoney = await newInstance.methods.supportMoney().call();
            let endTime = await newInstance.methods.endTime().call();
            let detail = {manager,projectName,targetMoney,supportMoney,endTime}
            // console.table(detail);

            // console.log(projectName);
            return detail;

        });

        // 把多个Promise处理成一个Promise
        let detailInfo = Promise.all(dtails);

        detailInfo.then(detail => {
            console.table(detail);
        })*/

        this.setState({
            creatorFundingDetails,
        });
    }

    render() {
        return (
            <div>
                <CardList details = {this.state.creatorFundingDetails}/>
            </div>

        )
    }
}

export default CreatorFundingTab