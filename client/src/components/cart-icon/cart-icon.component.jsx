import React from 'react'
// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { createStructuredSelector } from "reselect";
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from "../../redux/cart/cart.actions";
const CartIcon = ({toggleCartHidden,itemCount,color}) => (
    <IconButton onClick={toggleCartHidden} color="inherit">
    <Badge badgeContent={itemCount} color="secondary">
      <ShoppingCartOutlinedIcon style={{color:`${color}`}} onClick={toggleCartHidden}/>
    </Badge>
  </IconButton>
  
);
const mapDispatachToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})
const mapStateToProps = createStructuredSelector ({
    itemCount : selectCartItemsCount
})
export default connect(mapStateToProps,mapDispatachToProps)(CartIcon);