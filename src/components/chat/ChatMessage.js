import React from 'react';
import { 
    MessageGroup,
    Message,MessageText
   } from '@livechat/ui-kit';
import moment from 'moment'  
import { Typography } from '@material-ui/core';
export default function ChatMessage(props) {
    return(
        <>
        <MessageGroup>
            {/* {console.log(" props--.",props.data)} */}
        <Message className="" isOwn={ parseInt(props.ownId)===parseInt(props.data.fromid) ?true:false } date={moment(props.data.createdAt).format("HH:mm")}>
        <Typography className={parseInt(props.ownId)===parseInt(props.data.fromid)?'ReplayOwnMessage':'messageText'}>
        {props.data.message}   
              </Typography>
        </Message>
        {/* {console.log('received props',props)}
        <Message  date="21:10">
            <Typography className="messageText">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever </Typography>
        </Message>
        <Message  authorName="john" date="22:10">
            <Typography className="messageText">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever   </Typography>
        </Message> */}

        {/* <Message isOwn={props.ownId===props.data.fromid?true:false} authorName="" date="">
           {props.data.message}   
        </Message>
        <Message isOwn={props.ownId===props.data.fromid?true:false} date={moment(props.data.createdAt).format("HH:mm")} authorName=""> 
         </Message> */}
      </MessageGroup>
        </>
    )
}