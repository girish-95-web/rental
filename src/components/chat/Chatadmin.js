import React from 'react';
 import { ThemeProvider, ChatList } from '@livechat/ui-kit';
import { getchatlist, getchatwindow,getpropertylist,getlatestmessage } from '../../services/action/chat'
import { connect } from 'react-redux';
import { logout } from '../../services/action/auth';
import { bindActionCreators } from 'redux'
import ChatItem from './ChatItem';
import ChatWindow from './ChatWindow';
import socket from './socket';
import Nochatfound from './Nochatfound'
import PropertyInfo from './PropertyInfo';
class Chatadmin extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            chats:props.chats.chatList,
            messages:[],
            userprofile:[],
            userid: localStorage.userid,
            otherUserid:'',
            client: socket(),
            message:'',
            newguest:props.location.state,
            isInitialChat:true,
            isChatLoaded:false,
            isAdmin:true,
            isPrevHistoryfound:false,
            propertyInfoId:'',
            otherusername:''
        }
       this.onMessageReceived=(data)=>{
        console.log('data for admin',data)
        //    console.log('new message arive on admin',data)
        //    console.log('states with user',localStorage.userid,
        //    data.toid,
        //    this.state.otherUserid,
        //    data.fromid
        //    )
           if( parseInt(localStorage.userid) === parseInt(data.toid) && parseInt(this.state.otherUserid) === parseInt(data.fromid)){
            /*this.setState({...this.state,
                messages: [...this.state.messages, {
                fromid: parseInt(data.fromid),
                toid: parseInt(data.toid),
                message: data.msg,
                propertyInfoId: parseInt(data.propertyInfoId) 
            }]}) */
                this.props.getlatestmessage({
                fromid: parseInt(data.fromid),
                toid: parseInt(data.toid),
                message: data.msg,
                propertyInfoId:parseInt(data.propertyInfoId),
                
            })                                                                                                                                       
           } 
           this.props.getchatlist({isAdmin:this.state.isAdmin,propertyInfoId:parseInt(this.state.propertyInfoId)})
         
          }  
        }
        /*update the reducer*/
   sendmessage=(message)=>{
           // this.setState({...this.state,
        //     messages: [...this.state.messages, {
        //     fromid: message.fromid,
        //     toid: message.toid,
        //     message: message.msg,
        //     propertyInfoId:parseInt(this.state.propertyInfoId),
        //     hostuser_id:message.hostuser_id
        // }]});
        this.props.getlatestmessage({
                fromid: message.fromid,
                toid: message.toid,
                message: message.msg,
                propertyInfoId:parseInt(this.state.propertyInfoId),
                hostuser_id:message.hostuser_id
            })
        this.state.client.message(message)
        this.props.getchatlist({isAdmin:this.state.isAdmin,propertyInfoId:this.state.propertyInfoId})  
}
   /*handle changing the property id and handles the 
   * chats of all the users belong to propertyid
   */
    handlePropertyChange=(e)=>{
        // console.log('property info id',e)
        this.setState({
            propertyInfoId:e,
        })
    this.props.getchatlist({isAdmin:true,propertyInfoId:e})
    
    }
    /* loads the chat of the particular host and guest based on property
    * it sets the state
    * loads the getchatist so that the unread messages turn read
    */
    handleChatWindow=(e)=>{
        this.setState({
            ...this.state,
            otherUserid:e.otheruserid,
            otherusername:e.otherusername,
        })
        localStorage.chatWithUser = e.otheruserid;
        // localStorage.otherusername = e.otherusername
        // localStorage.propertyInfoId = e.propertyInfoId
        this.props.getchatwindow({
            otheruserid:e.otheruserid,
            isAdmin:this.state.isAdmin,
            propertyInfoId:this.state.propertyInfoId
        })  
        this.props.getchatlist({isAdmin:this.state.isAdmin,propertyInfoId:this.state.propertyInfoId})
    }
    /*
    * register the socket to client
    */
    register() {
        this.state.client.register(localStorage.userid)
    }
    /*loads all properties of the host
    * listener to messages received
    */
    componentDidMount() {  
        //this.props.getchatlist({isAdmin:this.state.isAdmin}) 
        this.props.getpropertylist({isAdmin:true}) 
        this.state.client.registerHandler(this.onMessageReceived)
        //this.loadinitialchat()
    }
    componentWillReceiveProps(props) {
        if(props.userprofile&&props.userprofile.success){
            this.setState({
                ...this.state,
                userid: props.userprofile.UserProfile.id
            }) 
            localStorage.userid=props.userprofile.UserProfile.id
            this.register(props.userprofile.UserProfile.id)
        }
        if(props.chats && props.chats.success){
            this.setState({
                ...this.state,
                chats: props.chats.chatList,
                // messages: (props.messages.chatList)?props.messages.chatList:'',
                otherUserid:localStorage.chatWithUser,
                isChatLoaded:true,
            })
        }
        if(props.messages&&props.messages.success){
            this.setState({
                ...this.state,
                messages: props.messages.chatList,
                isInitialChat:false,
                isPrevHistoryfound:props.messages.chatList.length?true:false
            })
        }
    }
    /*to initialize audio call
    *
    */
   makeCall = (data)=>{
    console.log('initializing call...',data)
    this.state.client.call(data)
    }
    render() {
        const { otherUserid,isPrevHistoryfound,
        otherusername,propertyInfoId
        } = this.state
        const {propertylist,messages,chats } = this.props
        return (
            <>
            <div style={{height:'100vh',backgroundColor: '#f4f4f4'}}>
                <ThemeProvider>
                     <PropertyInfo handlePropertyChange={this.handlePropertyChange} propertylist={propertylist&&propertylist.propertylisting}></PropertyInfo>
                    <div>
                        <div style={{ display: "flex",'justifyContent': 'center',backgroundColor:'#ffffff',boxShadow:'0px 2px 14px #2f2e2e1c',margin:'60px 0' }}>
                     <ChatList className="chatListItem" style={{ maxWidth: 300,width:'100%',backgroundColor:'#f7f7f7',borderRight:'1px solid rgba(0,0,0,0.1)' }}>
                            <ChatItem handleChatWindow={this.handleChatWindow} chats={((this.props.chats.chatList&&this.props.chats.chatList.length)?this.props.chats.chatList:[])}/>
                        </ChatList>
                        { messages && isPrevHistoryfound&&chats&&chats.chatList&&chats.chatList.length?
                        <ChatWindow
                        className="chatContantText"
                        makeCall={this.makeCall}
                        onSendMessage={this.sendmessage}
                        userid={localStorage.userid} 
                        otherUserid={localStorage.chatWithUser} 
                        otherusername = {otherusername}
                        hostuser={localStorage.userid}
                        propertyInfoId={propertyInfoId}
                        messages={messages&&messages.chatList}/> 
                        :<Nochatfound nochat={true}></Nochatfound>}
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
        getlatestmessage,
    }, dispatch)
  }
  const mapStateAuth = (state) => {
    return {
      chats: state.chat.chats,
      messages:state.chat.messages,
      userprofile:state.auth.userdetails,
      propertylist:state.chat.propertylist
    }
  }
export default connect(mapStateAuth, mapDispatchAuth)(Chatadmin);
