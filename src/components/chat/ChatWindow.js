import React from 'react';
import ChatMessage from './ChatMessage';
import { MessageList } from '@livechat/ui-kit';
import { Grid, Link} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import io from "socket.io-client";
import Nochatfound from './Nochatfound'
import Modal from 'react-modal';
class ChatWindow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        username: '',
        message: '',
        messages: this.props.messages?this.props.messages:[],
        userid: this.props.userid,
        otheruserid: this.props.otherUserid,
        hostuser_id:this.props.hostuser,
        newmessage: [],
        newuser: this.props.isnewUser ? this.props.isnewUser : false,
        show:false
    };
    
  this.sendMessage = () => {
        // ev.preventDefault();
        //  console.log('printitng the propertyinfoid',props);
          if (this.state.message != '') {
            this.props.onSendMessage({
              toid: parseInt(this.props.otherUserid),
              fromid: parseInt(this.props.userid),
              msg: this.state.message,
              propertyInfoId: parseInt(this.props.propertyInfoId),
              hostuser_id:parseInt(this.props.hostuser)   
          })
          this.setState({message: ''});
          }
      }
    this.initiateCall=()=>{
     //this.setState(...this.state,{show:true});
      // console.log('state--->hello')
      this.props.makeCall({
        toid: parseInt(this.props.otherUserid),
        fromid: parseInt(this.props.userid),
      })
    }  
    this.myMessage = ev => {
      this.setState({message: ev.target.value})
      // console.log('these are the props',ev.target.value)
    }
    this.handleKeyDown= (e)=> {
      if (e.key === 'Enter') {
        this.sendMessage()
      }
    }
  }
render(){
      return( 
        <div style={{ minWidth: '80%', height: 600, position:'relative', background:'#ffffff' }}>
         {/* {console.log('all the props in the messages window console',this.props)} */}
         { this.state.newuser && this.state.newuser ?"":
          <div className="mainChatHeader">
             <div className="chatUserName">{this.props.otherusername}</div>
              <div className="chatAudioCall">
                <div onClick={this.initiateCall}><CallIcon />
                </div>
                </div>
          </div>
        }
            <div className="mainChatSection">
        <MessageList active>
          { this.state.newuser && this.state.newuser ?
              <Nochatfound nochat={false}/> : 
             this.props.messages && this.props.messages.map((data,index)=>
                  <ChatMessage key={index}  ownId={this.props.userid} data={data}/> )               
            }
         <div className="chat-input">
          <br/>
          <input onKeyPress={this.handleKeyDown} type="text" placeholder="Message" className="form-control box-shadow" value={this.state.message} onChange={this.myMessage}/>
          <br/>
          <Grid className="button_col">
            <button onClick={this.sendMessage} className="btn bg-primary-color form-control ml-10">Send</button>
          </Grid>
          </div>   
        </MessageList>
      </div>
           
      </div>
      );
}
}    
export default ChatWindow 