import React, {Component} from 'react';
import {getFundingDetails, handleInvestFunc} from "../../eth/interaction";
import CardList from "../common/CardList";
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react'

class AllFundingTab extends Component {

    state = {
        active: false,
        allFundingTab: [],
        seletedFundingDetail: ''
    }

    async componentWillMount() {
        // funding地址的数组
        // let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();
        let allFundingTab = await getFundingDetails(1);

        this.setState({
            allFundingTab,
        });
    }

    // 传递一个回调函数给CardList，将所选择的Card的详细信息返回来
    onCardClick = (seletedFundingDetail) => {

        this.setState({
            seletedFundingDetail,
        })
        console.log("detail", seletedFundingDetail.projectName)
    }

    // 参与众筹函数
    handleInvest = async () => {
        this.setState({active: true})
        let {
            fundingAddress,
            manager,
            projectName,
            targetMoney,
            supportMoney,
            leftTime,
            balance,
            investorCount
        } = this.state.seletedFundingDetail;

        try {
            let res = await handleInvestFunc(fundingAddress, supportMoney)
            this.setState({active: false})
            window.location.reload(true)
            alert('参与成功，离梦想又近了一步')
        } catch (e) {
            this.setState({active: false})
            window.location.reload(true)
            alert('参与失败，请选择其它梦想参与')
        }

    }

    render() {
        let {
            fundingAddress,
            manager,
            projectName,
            targetMoney,
            supportMoney,
            leftTime,
            balance,
            investorCount
        } = this.state.seletedFundingDetail;

        return (
            <div>
                <CardList details={this.state.allFundingTab} onCardClick={this.onCardClick}/>
                <div>
                    <br/>
                    <h3>参与众筹</h3>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleInvest}>
                            <Form.Input type='text' value={projectName || ''} label='项目名称:'/>
                            <Form.Input type='text' value={fundingAddress || ''} label='项目地址:'/>
                            <Form.Input type='text' value={supportMoney || ''} label='支持金额:'
                                        labelPosition='left'>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='参与众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}

export default AllFundingTab