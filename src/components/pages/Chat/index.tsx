
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserChat from '../../common/UserChat'
import { users } from 'mocks/data'

const useStyles = makeStyles({
  title: {
    padding: 20,
  },
});


const Chat = () => {
  const classes = useStyles();

  return (
        <Grid container xs={12}>
            <Grid item xs={12} className={classes.title}>
                <Typography variant="h5" align='center' className="header-message">Get a hash from your message!</Typography>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" xs={12}>
                <UserChat user={users[0]} />
            </Grid>
        </Grid>

  );
}

export default Chat