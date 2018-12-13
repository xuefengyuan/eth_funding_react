import React, {Component} from 'react';
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react'
import {createFunding} from "../../eth/interaction";

class CreateFundingForm extends Component {

    state = {
        active: false,
        projectName: '',
        supportMoney: '',
        targetMoney: '',
        duration: ''
    }

    //表单数据数据变化时触发
    handleChange = (e, {name, value}) => this.setState({[name]: value})

    // 发起众筹函数
    handleCreate = async () => {
        let {active, projectName, supportMoney, targetMoney, duration} = this.state
        this.setState({active: true})
        try {
            let res = await createFunding(projectName, targetMoney, supportMoney, duration);
            this.setState({
                active: false,
                projectName: '',
                supportMoney: '',
                targetMoney: '',
                duration: ''
            })
            alert('众筹创建成功')
            this.setState({active: false})
            window.location.reload(true)
        } catch (e) {
            alert('众筹创建失败')
            console.log(e)
            this.setState({active: false})
            window.location.reload(true)
        }

    }


    render() {
        let {active, projectName, supportMoney, targetMoney, duration} = this.state
        return (
            <div>
                <br/>
                <h3>发起众筹</h3>
                <Dimmer.Dimmable as={Segment} dimmed={active}>
                    <Dimmer active={active} inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Form onSubmit={this.handleCreate}>
                        <Form.Input required type='text' placeholder='项目名称'
                                    name='projectName'
                                    value={projectName}
                                    label='项目名称:'
                                    onChange={this.handleChange}/>

                        <Form.Input required type='text' placeholder='支持金额'
                                    name='supportMoney'
                                    value={supportMoney}
                                    label='支持金额:'
                                    labelPosition='left'
                                    onChange={this.handleChange}>
                            <Label basic>￥</Label>
                            <input/>
                        </Form.Input>

                        <Form.Input required type='text' placeholder='目标金额'
                                    name='targetMoney'
                                    value={targetMoney}
                                    label='目标金额:'
                                    labelPosition='left'
                                    onChange={this.handleChange}>
                            <Label basic>￥</Label>
                            <input/>
                        </Form.Input>
                        <Form.Input required type='text' placeholder='众筹结束时间'
                                    name='duration'
                                    value={duration}
                                    label='众筹时间:'
                                    labelPosition='left'
                                    onChange={this.handleChange}>
                            <Label basic>S</Label>
                            <input/>
                        </Form.Input>
                        <Form.Button primary content='创建众筹'/>
                    </Form>
                </Dimmer.Dimmable>
            </div>
        )
    }

}


export default CreateFundingForm;