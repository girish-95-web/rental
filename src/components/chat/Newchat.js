import React from 'react';
 import { ThemeProvider,AgentBar, FixedWrapper, darkTheme, elegantTheme, purpleTheme, defaultTheme,
    Subtitle,    Avatar,
    Column,
    Row,
    Title,ChatList
} from '@livechat/ui-kit';
import { connect } from 'react-redux';
import ChatWindow from './ChatWindow';
import { bindActionCreators } from 'redux';
import { sendmessageadmin,checkForPreviousChat } from '../../services/action/chat';
class Newchat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chats:props.location.state?props.location.state:[],
            userid:props.userid,
            otherUserid:props.location.state.otheruserid,
            message:'',
            propertyInfoId:props.location.state.propertyInfoId,
            hostuser_id:props.location.state.otheruserid
        }
    }
    componentDidMount(){
        this.props.checkForPreviousChat({to:this.state.otherUserid,from:this.state.userid})
    }
    sendmessage=(message)=>{
        //console.log('to be sent props',message.msg,'--> new user',this.state)
        this.props.sendmessageadmin({toid:this.state.otherUserid,fromid:this.state.userid,message:message.msg,propertyInfoId:this.state.propertyInfoId,hostuser_id:this.state.hostuser_id})
    }
    componentWillReceiveProps(props) {
       // console.log('check for previous history',props.previousHistory.success);
        //check if the user is already chatted.
        if(props.previousHistory&&props.previousHistory.success){
            this.props.history.push({pathname:"/guest/chat"})
        }
        if(props.isMessageSent){
        //    this.props.history.push({pathname:"/guest/chat", state: { 
        //      propertyInfoId: this.state.data.propertyInfoId,
        //      otheruserid:this.state.id
        //  } 
        this.props.history.push({pathname:"/guest/chat"})
        } 
    } 
    // componentDidUpdate(){
    //     //console.log('received new props--->',this.props.userprofile.UserProfile.id)
    //         this.setState({userid:this.props.userprofile.UserProfile.id})
    //   //console.log('the new id', this.state.userid)
    // }  
    render() {  
        return (
            <>
            <div className="chatApp" style={{height:'100vh',backgroundColor: '#f4f4f4'}}>
                <ThemeProvider>
                    <div>
                        <div style={{ display: "flex",backgroundColor:'#ffffff',boxShadow:'0px 2px 14px #2f2e2e1c',margin:'60px 0' }}>
                     {/* <ChatList className="chatListItem" style={{ maxWidth: 300,width:'100%',backgroundColor:'#f7f7f7',borderRight:'1px solid rgba(0,0,0,0.1)' }}>
                            <ChatItem handleChatWindow={this.handleChatWindow} chats={chats && chats.length ? chats:""}/>
                        </ChatList> */}
                        <ChatWindow
                        className="chatContantText"
                        onSendMessage={this.sendmessage}                        
                        isnewUser={true}
                        // messages={messages&& messages.length ? messages:""}
                        /> 
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
        sendmessageadmin,
        checkForPreviousChat
    }, dispatch)
  }
const mapStateAuth = (state) => {
    return {    
      userid:state.auth.userId,
      isMessageSent:state.chat.isMessageSent,
      previousHistory:state.chat.previousHistory
    }
  }

export default connect(mapStateAuth,mapDispatchAuth)(Newchat);