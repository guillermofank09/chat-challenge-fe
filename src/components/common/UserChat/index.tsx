import { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Refresh from  '@material-ui/icons/Refresh';
import User from 'types/User'
import Message from 'types/Message'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
    margin: 20,
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
}))

interface Props {
    user: User
    messages?: Message[]
}

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:3001'

const UserChat = ({ user }: Props) => {
  const classes = useStyles()
  const textRef: any = useRef()
  const [message, setMessage] = useState<Message | undefined>(undefined)
  const [hashMessage, setHashMessage] = useState<Message | undefined>(undefined)

  useEffect (() => {
      if(message && !hashMessage){
          const body = {message: message.text}
      axios.post('/api/message',body)
      .then(res => {
         const { hash } = res.data
        setHashMessage({text: hash.toString(), sendAt: new Date()})
      })
    }
  },[hashMessage, message])

  const clear = () => {
      setMessage(undefined)
      setHashMessage(undefined)
      textRef.current.value = ''
  }

  const getHourAndMinutes = (date: Date) => {
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return `${date.getHours()}:${minutes}`
  }

  return (
        <Grid container component={Paper} className={classes.chatSection} xs={12}>
            <Grid item xs={12}>
            <List>
                    <ListItem button>
                        <ListItemIcon>
                        <Avatar alt={user.name} src={user.profileImage} />
                        </ListItemIcon>
                        <ListItemText primary={user?.nickName}></ListItemText>
                        <Grid container justifyContent='flex-end'>
                            <Button onClick={() => clear()}>
                                <Refresh  />
                            </Button>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <List className={classes.messageArea}>
                    {message && <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText primary={message.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText secondary={getHourAndMinutes(message.sendAt)}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    }
                    {hashMessage && <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText style={{textAlign: 'right'}} primary={hashMessage.text}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText style={{textAlign: 'right'}} secondary={getHourAndMinutes(hashMessage.sendAt)}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    }
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth inputRef={textRef} />
                    </Grid>
                    <Grid xs={1}>
                        <Button onClick={() => {
                            const { value } = textRef?.current || {}
                            setMessage({text: value, sendAt: new Date()})
                            setHashMessage(undefined)
                        }}>
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
  );
}

export default UserChat