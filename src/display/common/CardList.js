import React from 'react'
import {Card} from 'semantic-ui-react'

const src = '/images/daniel.jpg'

const CardList = (props) => {
    let details = props.details;

    console.table(details)

    let cards = details.map(detail =>{
        return <Card key={detail.fundingAddress} image={src}/>
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




export default CardList