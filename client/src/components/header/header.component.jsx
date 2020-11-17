import React from 'react';
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import {withRouter} from 'react-router-dom'
// import { selectCardHidden } from "../../redux/cart/cart.actions";
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import TemporaryDrawer from '../cart-dropdown/cart-dropdown.component'
// import SearchLocationInput from '../locationcomplete/locationautocomplete.component'
import {createStructuredSelector} from 'reselect'
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import './header.styles.scss'
// import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'
import { Link } from "react-router-dom";
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {connect} from 'react-redux';

import './header.styles'
import {signOutStart} from '../../redux/user/user.actions'
import Logo from '../../assets/logo.png'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { selectDirectorySections } from "../../redux/directory/directory.selectors";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // height: "150px",
    // width:"100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    color: "black",
    '&:hover': {
      backgroundColor: "darkgray",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "black"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Header({itemCount,currentUser,location,signOutStart}) {
  console.log(location);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [anchorE, setAnchorE] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const handleClick = (event) => {
    setAnchorE(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE(null);
  };
  const handleClicks = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClosee = () => {
    setAnchor(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
                currentUser ?
                <>
                <MenuItem as='div' onClick={signOutStart}>Sign Out</MenuItem>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                </>
                :
                <MenuItem onClick={handleMenuClose} className="option"><Link to='/signin'>Sign IN</Link></MenuItem>
            }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
      <>
      
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      style={{color:"black"}}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >                  
      <MenuItem onClick={handleMenuClose} className="option"><Link to='/signin'>Sign in</Link></MenuItem>
      <MenuItem style={{color:"black"}}><Link style={{color:"black"}} to="/shop"> SHOP</Link></MenuItem>
      <MenuItem style={{color:"black"}}><Link style={{color:"black"}} to="/categories">Categories</Link></MenuItem>   
      {/* <Link to="/signin"><MenuItem onClick={handleMenuClose} className="option">
        <p>Sign in</p>
      </MenuItem></Link> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        Profile
      </MenuItem>
    </Menu>
    </>
  );

  return (
    <div className={classes.grow}>
      <AppBar className="background"  position="static">
        <Toolbar >
            <div className="m">
          <Typography variant="h6" noWrap>
            <Link to="/"><img src={Logo} className="logo" alt="Dhaka Foodies Hub"/></Link>
          </Typography>
          {/* <div style={{display:"flex"}}> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{color:"black"}}/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </div>
          {/* <SearchLocationInput className={`${classes.inputRoot} ${classes.inputInput}`}/> */}
          </div>
          {/* </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}> 
                <MenuItem style={{color:"white"}}><Link style={{color:"white"}} to="/shop"><Button style={{color:"white",borderColor:"white",fontSize:"15px"}} variant="outlined" color="secondary"> SHOP </Button></Link></MenuItem>
                <MenuItem style={{color:"white"}}><Link style={{color:"white"}} to="/categories"><Button style={{color:"white",borderColor:"white",fontSize:"15px"}} variant="outlined" color="secondary"> Categories </Button></Link></MenuItem>
            {/*  */}
            <TemporaryDrawer color={"white"}/>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            {/* <CartIcon color={`white`}/> */}
            <TemporaryDrawer color={`white`}/>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        {/* <Toolbar style={}></Toolbar> */}
        {/* <hr/>
        <Toolbar style={{background:"white"}}>
        <div>
      <Button aria-controls="simple-menu" color="#144dde"  aria-haspopup="true" onClick={handleClick}>
        Categories <ExpandMoreIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorE}
        keepMounted
        open={Boolean(anchorE)}
        onClose={handleClose}
      >
          {
              sections.map((section,idx)=>(
               <>
               <MenuItem style={{fontSize:'20px',fontWeight:'bold',display:'grid',gridTemplateColumns: "1fr 1fr",overflow:'scroll'}} onClick={handleClose}>{section.title}:
                {
                    section.sub.map((sub,idx)=>(
                        <>
                        <Link to={`/${sub.linkUrl}`}><MenuItem onClick={handleClose}>{sub.title}</MenuItem></Link>
                        
                        </>
                    ))
                }
               
                </MenuItem>
                <br/>
                </>
              ))
          }
          
      </Menu>
    </div>
    <Button color="default">Primary</Button>
        </Toolbar> */}
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    sections: selectDirectorySections,
    itemCount : selectCartItemsCount,
    hidden: selectCartHidden,
})
const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart()),
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))