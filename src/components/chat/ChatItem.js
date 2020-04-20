import React from 'react';
import  ChatItemlist  from './ChatItemlist';
    export default function ChatItem(props) {
        return (
    <>
   {
       props.chats && props.chats.map((chat,index)=>
        <ChatItemlist key={index}  data={chat} {...props}/>
       )
   }      
    </>
        );
    }