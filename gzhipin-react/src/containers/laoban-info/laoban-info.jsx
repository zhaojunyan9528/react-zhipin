import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'
/*简单的显示 logo 的组件
*/
class LaobanInfo extends Component {
    state = {
        header: '',
        info: '',
        post: '',
        company: '',
        salary: ''
    }
    handleChange = (name, val) => {
        this.setState({ [name]: val })
    }
    // 设置更新 header
    setHeader = (header) => {
        this.setState({ header })
    }

    render() {
        const { user } = this.props
        // 如果用户信息已完善, 自动跳转到 laoban 主界面
        if (user.header) {
            return <Redirect to='/laoban' />
        }

        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder='请输入职位' onChange={val => this.handleChange('post', val)} >招聘职位:</InputItem>
                <InputItem onChange={val => this.handleChange('company', val)} placeholder='请输入公司名称'>公司名称:</InputItem>
                <InputItem onChange={val => this.handleChange('salary', val)} placeholder='请输入薪资'>职位薪资:</InputItem>
                <TextareaItem title="职位要求:"
                    rows={3}
                    onChange={val => this.handleChange('info', val)} />
                <Button type='primary' onClick={() => this.props.updateUser(this.state)}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {updateUser}
)(LaobanInfo)