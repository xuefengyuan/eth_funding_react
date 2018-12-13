import React, {Component} from 'react';
import {fundingFactoryInstance, newFundingInstance} from '../../eth/instance';
import {approveRequest, getFundingDetails, showRequest} from "../../eth/interaction";
import CardList from "../common/CardList";
import {Button} from "semantic-ui-react";
import RequestTable from "../common/RequestTable";

class SupporterFundingTab extends Component {

    state = {
        supporterFundingTab: [],
        seletedFundingDetail:'',
        requests: [], // 所有的花费请求
    }

    async componentWillMount() {
        // funding地址的数组
        // let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();
        let supporterFundingTab = await getFundingDetails(3);

        this.setState({
            supporterFundingTab,
        });
    }

    // 传递一个回调函数给CardList，将所选择的Card的详细信息返回来
    onCardClick = (seletedFundingDetail) => {

        this.setState({
            seletedFundingDetail,
        })
        console.log("dd detail", seletedFundingDetail)
    }

    // 获取选中的众筹花费申请
    handleShowRequests = async () => {
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;
        let requests = await showRequest(fundingAddress);
        // console.log("req : ",requests)
        this.setState({requests})
    }

    // 获取当前用户选中的众筹合约的花费请求
    handleShowRequests = async () => {
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;
        let requests = await showRequest(fundingAddress);
        console.log("req c: ",requests)
        this.setState({requests})
    }

    handleApprove = async (index)=>{
        console.log('批准了',index)

        try {
            let req = await approveRequest(this.state.seletedFundingDetail.fundingAddress, index)
            alert('花费投票成功')
        } catch (e) {
            alert('花费投票失败')
            console.log(e)
        }
    }

    render() {
        let {
            supporterFundingTab, seletedFundingDetail, requests, // 所有的花费请求
        } = this.state;

        return (
            <div>
                <CardList details = {supporterFundingTab}
                          onCardClick={this.onCardClick}/>
                {
                    // 选择了众筹才显示下面的详情信息
                    seletedFundingDetail && (<div>
                        <br/>
                        <Button onClick={this.handleShowRequests}>申请详情</Button>
                        <RequestTable requests ={requests}
                                      handleApprove = {this.handleApprove}
                                      pageKey = {3}
                                      investorCount = {seletedFundingDetail.investorCount}
                        />
                    </div>)
                }
            </div>
        )
    }
}

export default SupporterFundingTab