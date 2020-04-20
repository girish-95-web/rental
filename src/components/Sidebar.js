import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import StreetviewIcon from '@material-ui/icons/Streetview';
import SettingsIcon from '@material-ui/icons/Settings';
import RateReviewIcon from '@material-ui/icons/RateReview';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import CollectionsTwoToneIcon from '@material-ui/icons/CollectionsTwoTone';
import EventSeatTwoToneIcon from '@material-ui/icons/EventSeatTwoTone';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#1c1c1c',
    boxShadow:'4px 0 11px 0 #00000069'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function PersistentDrawerLeft({rolestatus}) {
  // const {isAdmin} = rolestatus
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
   
    <div className={classes.root}>
      <Toolbar className="fixed_button">
     
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
              {localStorage.isAdmin === "Host" ? 
                <ul className="sidebar_menu pl-0">
                <li><Link to="/admin/dashboard"><HomeIcon className="iconColor"/> Dashboard</Link></li>
                <li><Link to="/admin/calendar"><DateRangeIcon /> Calendar</Link></li>
                <li><Link to="/admin/chat"><ChatBubbleIcon /> Message</Link></li>
                <li><Link to="/admin/space"><DeviceHubIcon/> Spaces</Link></li>
                <li><Link to="/admin/addvenue"><StreetviewIcon /> Venue Setup</Link></li> 
              </ul>
                : 
                <ul className="sidebar_menu pl-0">
                <li><Link to="/guest/dashboard"><HomeIcon className="iconColor"/> Dashboard</Link></li>
                <li><Link to="/guest/chat"><ChatBubbleIcon /> Message</Link></li>
                <li><Link to="/guest/reservations"><EventSeatTwoToneIcon/> Reservations</Link></li>
                <li><Link to="/guest/collections"><CollectionsTwoToneIcon /> Collections</Link></li>
                {/* <li><Link to="/guest/reviews"><RateReviewIcon /> Reviews</Link></li> */}
                </ul>
                }  
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
const mapGetState = (state) => {
  return {
      rolestatus: state.auth.isAdmin
  }
}
export default connect(mapGetState)(PersistentDrawerLeft);
