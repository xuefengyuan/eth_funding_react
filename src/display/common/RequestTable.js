import React from 'react'
import {Table,Button} from 'semantic-ui-react'

const RequestTable = (props) => {

    let {requests,handleFunalize,handleApprove,pageKey,investorCount} = props;

    // 遍历每行的
    let rowContainer = requests.map((request, i) => {
        return <RowInfo key={i}
                        request={request}
                        handleApprove={handleApprove}
                        handleFunalize={handleFunalize}
                        index = {i}
                        pageKey = {pageKey}
                        investorCount = {investorCount}
        />
    })

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>花费描述</Table.HeaderCell>
                    <Table.HeaderCell>花费金额</Table.HeaderCell>
                    <Table.HeaderCell>商家地址</Table.HeaderCell>
                    <Table.HeaderCell>当前赞成人数</Table.HeaderCell>
                    <Table.HeaderCell>当前状态</Table.HeaderCell>
                    <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    rowContainer
                }
            </Table.Body>
        </Table>
    )
}

// 请求信息的每一行
let RowInfo = (props) => {
    let {request,handleFunalize,handleApprove,index,pageKey,investorCount} = props;
    console.log("req 1 : ",request)
    let {0:purpose, 1:cost, 2:seller, 3:approveCount, 4:status} = request

    // console.log(purpose)
    let statusInfo = ''
    // 产品状态的枚举：0：进行中，1：已批准，2：已完成
    if (status == 0){
        statusInfo = 'voting';
    } else if (status == 1){
        statusInfo = 'approved';
    }else if (status == 2){
        statusInfo = 'completed';
    }

    return (
        <Table.Row>
            <Table.Cell>{purpose}</Table.Cell>
            <Table.Cell>{cost}</Table.Cell>
            <Table.Cell>{seller}</Table.Cell>
            <Table.Cell> {approveCount} / {investorCount}</Table.Cell>
            <Table.Cell>{statusInfo}</Table.Cell>
            <Table.Cell>
                {
                    (pageKey == 2)?(
                        <Button onClick={() =>handleFunalize(index)}>支付</Button>
                    ):(
                        <Button onClick={() => handleApprove(index)}>批准</Button>
                    )
                }
            </Table.Cell>
        </Table.Row>
    )
}


export default RequestTable