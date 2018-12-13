import React, {Component} from 'react';
import {createRequest, finalizeRequest, getFundingDetails, showRequest} from "../../eth/interaction";
import CardList from "../common/CardList";
import CreateFundingForm from "./CreateFundingForm";
import {Button, Form, Label, Segment} from 'semantic-ui-react'
import RequestTable from "../common/RequestTable";

class CreatorFundingTab extends Component {

    state = {
        creatorFundingDetails: [],
        seletedFundingDetail: '',
        requestDesc: '', // purpose ， 项目方花费的目的
        requestBalance: '', // cost， 花费金额
        requestAddress: '', // seller, 卖家地址
        requests: [], // 所有的花费请求
    }

    async componentWillMount() {
        // funding地址的数组
        // let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();
        let creatorFundingDetails = await getFundingDetails(2);
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

    // 传递一个回调函数给CardList，将所选择的Card的详细信息返回来
    onCardClick = (seletedFundingDetail) => {

        this.setState({
            seletedFundingDetail,
        })
        console.log("bb detail", seletedFundingDetail.projectName)
    }

    //表单数据数据变化时触发
    handleChange = (e, {name, value}) => this.setState({[name]: value})

    // 创建花费请求函数
    handleCreateRequest = async () => {
        let {
            creatorFundingDetails,
            seletedFundingDetail,
            requestDesc, // purpose ， 项目方花费的目的
            requestBalance, // cost， 花费金额
            requestAddress, // seller, 卖家地址
            requests, // 所有的花费请求
        } = this.state;

        try {
            let req = await createRequest(seletedFundingDetail.fundingAddress, requestDesc, requestBalance, requestAddress);
            window.location.reload(true)
            alert('申请创建成功')
        } catch (e) {
            window.location.reload(true)
            alert('申请创建失败')
        }

    }

    // 获取选中的众筹花费申请信息
    handleShowRequests = async () => {
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;
        let requests = await showRequest(fundingAddress);
        // console.log("req : ",requests)
        this.setState({requests})
    }

    // 终结请求（花钱）
    handleFunalize = async (index) =>{
        console.log('index = ',index)
        let fundingAddress = this.state.seletedFundingDetail.fundingAddress;
        try {
            let req = await finalizeRequest(fundingAddress, index);
            alert('花钱成功了，有大佬支持，我的梦想可以实现了')
        } catch (e) {
            console.log(e)
            alert('花钱失败了')
        }

    }

    render() {

        let {
            creatorFundingDetails,
            seletedFundingDetail,
            requestDesc, // purpose ， 项目方花费的目的
            requestBalance, // cost， 花费金额
            requestAddress, // seller, 卖家地址
            requests, // 所有的花费请求
        } = this.state;

        return (
            <div>
                <CardList details={this.state.creatorFundingDetails} onCardClick={this.onCardClick}/>
                <CreateFundingForm/>
                {
                    <div>
                        <br/>
                        <h3>发起付款请求</h3>

                        <Segment>
                            <h4>当前项目: {seletedFundingDetail.projectName},
                                地址: {seletedFundingDetail.fundingAddress} </h4>
                            <Form onSubmit={this.handleCreateRequest}>
                                <Form.Input type='text' name='requestDesc' required value={requestDesc}
                                            label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                                <Form.Input type='text' name='requestBalance' required value={requestBalance}
                                            label='付款金额' labelPosition='left' placeholder='付款金额'
                                            onChange={this.handleChange}>
                                    <Label basic>￥</Label>
                                    <input/>
                                </Form.Input>

                                <Form.Input type='text' name='requestAddress' required value={requestAddress}
                                            label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                            onChange={this.handleChange}>
                                    <Label basic><span role='img' aria-label='location'>📍</span></Label>
                                    <input/>
                                </Form.Input>

                                <Form.Button primary content='开始请求'/>
                            </Form>
                        </Segment>
                    </div>
                }
                {
                    // 选择了众筹才显示下面的详情信息
                    seletedFundingDetail && (<div>
                        <br/>
                        <Button onClick={this.handleShowRequests}>申请详情</Button>
                        <RequestTable requests ={requests}
                                      handleFunalize={this.handleFunalize}
                                      pageKey = {2}
                                      investorCount = {seletedFundingDetail.investorCount}
                        />
                    </div>)
                }
            </div>

        )
    }
}

export default CreatorFundingTab