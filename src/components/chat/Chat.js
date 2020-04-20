import React from 'react';
import { ThemeProvider, ChatList } from '@livechat/ui-kit';
import { getchatlist, getchatwindow, getpropertylist, getlatestmessage } from '../../services/action/chat'
import { connect } from 'react-redux';
import { logout } from '../../services/action/auth';
import { bindActionCreators } from 'redux'
import ChatItem from './ChatItem';
import Nochatfound from './Nochatfound';
import ChatWindow from './ChatWindow';
import socket from './socket';
import PropertyInfo from './PropertyInfo';
class Chat extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            chats: props.chats.chatList,
            messages: [],
            userprofile: [],
            userid: localStorage.userid,
            otherUserid: '',
            client: socket(),
            message: '',
            newguest: props.location.state,
            isInitialChat: true,
            isChatLoaded: false,
            otherusername: '',
            isPrevHistoryfound: false,
            isAdmin: false,
            propertyInfoId: '',
            propertylist: "",
            hostuser: ""
        }
        this.onMessageReceived = (data) => {

            if (parseInt(this.state.userid) === parseInt(data.toid) && parseInt(this.state.otherUserid) === parseInt(data.fromid)) {
                //  console.log('to be appended')
                // this.setState({messages: [...this.state.messages, {
                //     fromid: parseInt(data.fromid),
                //     toid: parseInt(data.toid),
                //     message: data.msg,
                //     propertyInfoId: parseInt(data.propertyInfoId) 
                // }]})
                this.props.getlatestmessage({
                    fromid: parseInt(data.fromid),
                    toid: parseInt(data.toid),
                    message: data.msg,
                    propertyInfoId: parseInt(data.propertyInfoId),
                    hostuser_id: data.hostuser_id
                })
            } else {
                // console.log('not appended')
            }
            this.props.getchatlist({ isAdmin: true, propertyInfoId: parseInt(this.state.propertyInfoId) })
        }
    }
    loadinitialchat = () => {
        // console.log('loading chats')
        if (this.state.isInitialChat && this.state.isChatLoaded) {
            // console.log(' loading chats chat is loaded wating for first message load',this.state.isInitialChat)
            localStorage.chatWithUser = this.state.chats[0].other_user_id;
            localStorage.otherusername = this.state.chats[0].firstName;
            // this.props.getchatwindow(this.state.chats[0].other_user_id)     
        }
    }
    /*changing property 
    * sets the state propertyinfo, hostuser_id
    */
    handlePropertyChange = (e) => {
        this.setState({
            propertyInfoId: e,
        })
        this.props.getchatlist({ isAdmin: false, propertyInfoId: e })
    }
    sendmessage = (message) => {

        // this.setState({messages: [...this.state.messages, {
        //     fromid: parseInt(message.fromid),
        //     toid: parseInt(message.toid),
        //     message: message.msg,
        //     propertyInfoId:parseInt(this.state.propertyInfoId),
        //     hostuser_id:message.hostuser_id   
        // }]});
        this.props.getlatestmessage({
            fromid: parseInt(message.fromid),
            toid: parseInt(message.toid),
            message: message.msg,
            propertyInfoId: parseInt(this.state.propertyInfoId),
            hostuser_id: message.hostuser_id
        })
        this.state.client.message(message)
        this.props.getchatlist({ isAdmin: this.state.isAdmin, propertyInfoId: this.state.propertyInfoId })
    }
    makeCall = (data) => {
        data.type = "audio"
        console.log('initializing call... with audio', data)
        //this.state.client.call(data)
    }
    handleChatWindow = (e) => {
        console.log('handling chat window', e)
        // console.log('updateing thre otheruserid-->',e)
        // localStorage.chatWithUser = e.otheruserid;
        // localStorage.otherusername = e.otherusername
        // localStorage.propertyInfoId = e.propertyInfoId
        // //this.props.getchatwindow(e.otheruserid) 
        // this.props.getchatwindow({otheruserid:e.otheruserid
        //,isAdmin:this.state.isAdmin,propertyInfoId:e.propertyInfoId})  
        // this.setState({...this.setState,
        //     otherUserid:e.otheruserid,
        //     otherusername:localStorage.otherusername,
        //     propertyInfoId:e.propertyInfoId
        // })
        // this.props.getchatlist({isAdmin:this.state.isAdmin}) 
        this.setState({
            otherUserid: e.otheruserid,
            otherusername: e.otherusername,
            hostuser: e.hostuserid
        })
        localStorage.chatWithUser = e.otheruserid;
        // localStorage.otherusername = e.otherusername
        // localStorage.propertyInfoId = e.propertyInfoId
        this.props.getchatwindow({
            otheruserid: e.otheruserid,
            isAdmin: this.state.isAdmin,
            propertyInfoId: e.propertyInfoId
        })

        this.props.getchatlist({ isAdmin: this.state.isAdmin, propertyInfoId: e.propertyInfoId })
    }
    register() {
        this.state.client.register(localStorage.userid)
    }

    /* load the all the properties a guest has ever chatted
    * register the message receiver
    */
    componentDidMount() {
        this.props.getpropertylist({ isAdmin: false })
        this.state.client.registerHandler(this.onMessageReceived)
    }
    componentWillReceiveProps(props) {
        if (props.userprofile && props.userprofile.success) {
            this.setState({
                ...this.state,
                userid: props.userprofile.UserProfile.id
            })
            localStorage.userid = props.userprofile.UserProfile.id
            this.register(props.userprofile.UserProfile.id)
        }
        if (props.chats && props.chats.success) {
            this.setState({
                ...this.state,
                chats: props.chats.chatList,
                otherUserid: localStorage.chatWithUser,
                userid: localStorage.userid,
                isChatLoaded: props.chats.chatList.length ? true : false,
            })
        }
        if (props.messages && props.messages.success) {
            this.setState({
                ...this.state,
                messages: props.messages.chatList,
                isInitialChat: false,
                isPrevHistoryfound: props.messages.chatList.length ? true : false
            })
            //this.props.getchatlist({isAdmin:this.state.isAdmin})
        }
    }
    render() {
        const { isPrevHistoryfound, propertyInfoId,
            hostuser, otherusername, isInitialChat,
            otherUserid } = this.state
        const { propertylist, messages, chats } = this.props
        // console.log('herer si the propertylist',propertylist)
        return (
            <>
                {/* <Nochatfound /> */}
                <div className="chatApp" style={{ height: '100vh', backgroundColor: '#f4f4f4' }}>
                    <ThemeProvider>
                        <div>
                            <PropertyInfo handlePropertyChange={this.handlePropertyChange}
                                propertylist={propertylist && propertylist.propertylisting}></PropertyInfo>
                            <div>
                                <div style={{ display: "flex", backgroundColor: '#ffffff', boxShadow: '0px 2px 14px #2f2e2e1c', margin: '60px 0' }}>
                                    {console.log('messa-->', messages.length, 'is prev found', isPrevHistoryfound)}
                                    <ChatList className="chatListItem" style={{ maxWidth: 300, width: '100%', backgroundColor: '#f7f7f7', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
                                        {/* <ChatItem handleChatWindow={this.handleChatWindow} chats={chats && chats.length ? chats:""}/> */}
                                        <ChatItem handleChatWindow={this.handleChatWindow} chats={((this.props.chats.chatList && this.props.chats.chatList.length) ? this.props.chats.chatList : '')} />
                                    </ChatList >
                                    {messages && isPrevHistoryfound && chats && chats.chatList && chats.chatList.length ?
                                        <ChatWindow
                                            {...this.props}
                                            makeCall={this.makeCall}
                                            className="chatContantText"
                                            onSendMessage={this.sendmessage}
                                            userid={localStorage.userid}
                                            otherUserid={localStorage.chatWithUser}
                                            otherusername={otherusername}
                                            hostuser={hostuser}
                                            propertyInfoId={propertyInfoId}
                                            messages={messages && messages.chatList}
                                            isInitialChat={isInitialChat}
                                        />
                                        : <Nochatfound nochat={true} />}
                                </div>
                            </div>
                       </div>
                </ThemeProvider>
                            </div> 
            </>
                )
            }
        }
const mapDispatchAuth = (dispatch) => {
    return bindActionCreators({
                    getchatlist,
                    getchatwindow,
                    getpropertylist,
                    getlatestmessage
                }, dispatch)
            }
  const mapStateAuth = (state) => {
    return {
                    chats: state.chat.chats,
            messages:state.chat.messages,
            userprofile:state.auth.userdetails,
            propertylist:state.chat.propertylist
           // userchatlist
          }
      }
      export default connect(mapStateAuth, mapDispatchAuth)(Chat);
