import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

const logOut = () => {
  localStorage.removeItem('jwt');
}

function BottomAppBar(props) {
  const { classes } = props;
  const auth = localStorage.getItem('jwt')

  return (
    <Fragment>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div>
              <IconButton color="inherit" onClick = {() => logOut()}>
                { auth ? <Link to = '/users/login' style={{color: 'white'}} > Logout </Link> : <Link to='/users/login' style={{color: 'white'}}>Login</Link> }
              </IconButton>
              <IconButton color="inherit">
                 <Link to='/users/register' style={{color: 'white'}}>Register</Link>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
    </Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
      outline: 'none'
  }
});

export default withStyles(styles)(BottomAppBar);
