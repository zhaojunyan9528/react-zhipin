/*用户个人中心路由组件
*/
import React from 'react'
import { Result, List, WhiteSpace, Button ,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief
class Personal extends React.Component {
    handleLogout = () => {
        Modal.alert('退出', '确认退出登录吗?', [
            {
                text: '取消',
                onPress: () => console.log('cancel')
            },
            {
                text: '确认',
                onPress: () => {
                    // 清除 cookie 中的 userid
                    Cookies.remove('userid')
                    // 重置 redux 中的 user 状态
                    this.props.resetUser()
                }
            }
        ])
    }
    render() {
        const { username, header, post, info, salary, company } = this.props.user
        return (
            <div style={{ marginTop: 50 }}>
                <Result
                    img={<img src={require(`../../assets/imgs/${header}.png`)} style={{
                        width:
                            50
                    }} alt="header" />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button onClick={this.handleLogout} type='warning'>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal)