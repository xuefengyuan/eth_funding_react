import React, {Component} from 'react';
import {fundingFactoryInstance, newFundingInstance} from '../../eth/instance';
import {getFundingDetails} from "../../eth/interaction";
import CardList from "../common/CardList";

class AllFundingTab extends Component {

    state = {
        allFundingTab: [],
    }

    async componentWillMount() {
        // funding地址的数组
        // let creatorFundingDetails = await fundingFactoryInstance.methods.getCreatorFundings().call();
        let allFundingTab = await getFundingDetails(1);

        this.setState({
            allFundingTab,
        });
    }

    render() {
        return (
            <div>
                <CardList details = {this.state.allFundingTab}/>
            </div>
        )
    }
}

export default AllFundingTab