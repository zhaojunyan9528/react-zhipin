/*对话聊天的路由组件
*/
import React, { Component } from 'react'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg } from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
class Chat extends Component {
    state = {
        content: '',
        isShow: false // 是否显示表情列表
    }
    componentWillMount() {
        this.emojis = ['', '', '', '', '', '', '❤', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '❤', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '❤', '', '', '', '', '', '', '']
        this.emojis = this.emojis.map(value => ({ text: value }))
        // console.log(this.emojis)
        this.props.readMsg(this.props.match.params.userid)
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        this.props.readMsg(this.props.match.params.userid)
    }
    componentDidUpdate() {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    // 切换表情列表的显示
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({ isShow })
        if (isShow) {
            // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    submit = () => {
        const content = this.state.content.trim()
        const to = this.props.match.params.userid
        const from = this.props.user._id
        this.props.sendMsg({ from, to, content })
        this.setState({ content: '' })
    }
    render() {
        const { user } = this.props
        const { chatMsgs, users } = this.props.chat
        const targetId = this.props.match.params.userid
        if (!users[targetId]) {
            return null
        }
        const meId = user._id
        const chatId = [targetId, meId].sort().join('_')
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        const targetIcon = users[targetId] ?
            require(`../../assets/imgs/${users[targetId].header}.png`) : null
        return (
            <div id='chat-page'>
                <NavBar
                    className='stick-top'
                    icon={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{ marginBottom: 50, marginTop: 50 }}>
                    <QueueAnim type='left' delay={100}>
                        {
                            msgs.map(msg => {
                                if (targetId === msg.from) {// 对方发给我的
                                    return (
                                        <Item
                                            key={msg._id}
                                            thumb={targetIcon}
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                } else { // 我发给对方的
                                    return (
                                        <Item
                                            key={msg._id}
                                            className='chat-me'
                                            extra='我'
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                }
                            })
                        }
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        onFocus={() => this.setState({ isShow: false })}
                        extra={
                            <span>
                                <span onClick={this.toggleShow}
                                    style={{ marginRight: 10 }}></span>
                                <span onClick={this.submit}>发送</span>
                            </span>
                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({ content: this.state.content + item.text })
                                }}
                            />
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg })(Chat)