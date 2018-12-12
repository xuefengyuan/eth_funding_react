import React, {Component} from 'react';
import {fundingFactoryInstance, newFundingInstance} from '../../eth/instance';
import {getFundingDetails} from "../../eth/interaction";
import CardList from "../common/CardList";

class SupporterFundingTab extends Component {

    state = {
        supporterFundingTab: [],
    }

    async componentWillMount() {
        // funding地址的数组
        // let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();
        let supporterFundingTab = await getFundingDetails(3);

        this.setState({
            supporterFundingTab,
        });
    }

    render() {
        return (
            <div>
                <CardList details = {this.state.supporterFundingTab}/>
            </div>
        )
    }
}

export default SupporterFundingTab