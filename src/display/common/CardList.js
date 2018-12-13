import React from 'react'
import {Card,Icon, Image ,List} from 'semantic-ui-react'

const src = '/images/daniel.jpg'

const CardList = (props) => {
    let details = props.details;
    let onCardClick = props.onCardClick;

    console.table(details)

    let cards = details.map(detail =>{
        return <CardFunding
            key={detail.fundingAddress}
            detail ={detail}
            onCardClick={onCardClick}  // 继续传递到下一层
        />
    })

    return (
        <Card.Group itemsPerRow={4}>
            {/*<Card color='red' image={src}/>
            <Card color='orange' image={src}/>
            <Card color='yellow' image={src}/>*/}
            {
                cards
            }

        </Card.Group>
    )
}

const CardFunding = (props) => {
    let detail = props.detail;
    let onCardClick = props.onCardClick
    // console.table(detail)
    let {fundingAddress,manager, projectName, targetMoney, supportMoney, leftTime,balance,investorCount} = detail;
    let percent = parseFloat(balance) / parseFloat(targetMoney) * 100
    return(
        <Card onClick={() => onCardClick && onCardClick(detail)}>
            <Image src='/images/daniel.jpg' />
            <Card.Content>
                <Card.Header>{projectName}</Card.Header>
                <Card.Meta>
                    <span className='date'>剩余时间:{leftTime}</span>
                </Card.Meta>
                <Card.Description>参与众筹实现你的移民梦...</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <List horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                    <List.Item>
                        <List.Header>已筹</List.Header>
                        {balance} ETH
                    </List.Item>
                    <List.Item>
                        <List.Header>进度</List.Header>
                        {percent} %
                    </List.Item>
                    <List.Item>
                        <List.Header>参与人数</List.Header>
                        {investorCount}
                    </List.Item>
                </List>

            </Card.Content>
        </Card>
    )

}






export default CardList