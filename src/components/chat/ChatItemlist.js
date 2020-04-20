import React from 'react';
import { Grid, } from '@material-ui/core';
import { 
    ChatListItem,
    Avatar,
    Column,
    Row,Subtitle,
    Title} from '@livechat/ui-kit';
    import moment from 'moment'
export default function ChatItemlist(props) {
    const { data } = props
    return (
<>
{console.log('displaying thre user chat propert=yid for unread',props)}
        <ChatListItem onClick={()=>props.handleChatWindow({'otheruserid':data.other_user_id,'otherusername':data.firstName,"propertyInfoId":data.propertyInfoId,'hostuserid':data.hostuser_id})}>
            <Avatar className="profilePicture" imgUrl={data.profilepic} />
            <Grid fill  style={{width:'100%',maxWidth:'225px',position: 'relative'}}>
            <Row justify>
                <Title >{data.firstName}</Title>
                <Subtitle nowrap>{moment(props.data.createdAt).format("HH:mm")}</Subtitle>
            </Row>
            <Subtitle ellipsis>
                {data.message}
            </Subtitle>
            {/* {console.log(localStorage.chatWithUser,data.other_user_id)} */}
            { parseInt(data.unread_messages) > parseInt(0) && (parseInt(localStorage.chatWithUser)!==parseInt(data.other_user_id)) ?
            <div className="ldg0" style={{
                position: 'absolute',
                top: '23px',
                right: '-3px',
                background: '#ffd95b',
                padding: '3px',
                borderRadius: '50%',
                width: 'AUTO',
                height: 'AUTO',
                lineHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>{data.unread_messages}</div> 
             :''} 
            </Grid>
        </ChatListItem>
</>
)
}