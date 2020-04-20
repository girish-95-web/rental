import React from 'react'
import { Grid, Container, Typography} from '@material-ui/core';
import nochat from '../../assets/images/nochat.png';
import newuser from '../../assets/images/newuser.png';

export default function Nochatfound(props) {
    return (
        <>
            <section id="" className="w-100" >
                <div className="mb-60">
                    <div className="">
                        <Container>
                            {console.log('message for the chat->window',props.message)}
                            {props.nochat? 
                           <div className="noChat">
                                <img src={nochat} style={{ width: '320px'}} alt="confirm"/>
                                {props.message?
                                <Typography className="">Choose a chat to start messaging</Typography>:
                                <Typography className="">No Chats Available </Typography>
                            }
                               
                           </div>
                            :
                           <div className="noChat newUser">
                                <img src={newuser} style={{ width: '320px'}} alt="newuser"/>
                               <Typography className="">Welcome!</Typography>
                               <span className="f16">Send Message To start </span>
                           </div>
                            }
                        </Container>
                    </div>
                </div>
            </section>
        </>
    )
}
