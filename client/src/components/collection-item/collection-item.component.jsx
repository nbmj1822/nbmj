import React from 'react'
import './collection-item.styles.scss'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {Link} from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import CustomButton from '../custom-button/custom-button.component'
import './collection-item.styles.scss'
const useStyles = makeStyles((theme) => ({
  root: {
    width: "23vw",
    display: "flex",
    flexDirection: "column",
    height: "600px",
    // marginBottom: "50px",
    alignItems: "center",
    position: "relative",
    // margin:'40px'
  },
  media: {
      width: "100%",
      height: "400px",
      backgroundSize: "cover",
      backgroundPosition: "center",
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function CollectionItem({item,addItem,title}) {
  const classes = useStyles();
  item = {...item,title:title}
  const {name,price,imageUrl,slug,rating} = item

  return (
    <div>  
      <Card className="collection-item" style={{borderRadius:"none"}}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={name}
      />
      <CardContent>
      <Link to={`/${slug}`}><Typography  style={{paddingBottom:"0px",marginBottom:"0px",textAlign:"center"}} color="textSecondary" component="p">
          <div style={{color:"#2c0a0a",fontSize:"20px",fontWeight:"bold",paddingBottom:"0px",marginBottom:"0px"}}>{name}</div>
          <div style={{color:"#2c0a0a",fontSize:"20px",fontWeight:"bold",paddingBottom:"0px",marginBottom:"0px"}}>${price}</div>
        </Typography>
      <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly/>
      </Link>
      </CardContent>
      <CardActions disableSpacing>
      <CustomButton className="custom-button" onClick={()=>addItem(item)} type="button">
      <IconButton>
          <AddShoppingCartIcon style={{color:'white'}} />
        </IconButton>
        Add to Cart
      </CustomButton>
      </CardActions>
    </Card>

    </div>

  );
}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});
export default connect(null,mapDispatchToProps)(CollectionItem);