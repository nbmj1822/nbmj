import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import './item.styles.scss'
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from '../../components/custom-button/custom-button.component'
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Banner from '../../components/banner'
import StyledHero from '../../components/StyledHero'
import Hero from '../../assets/73931.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SocialMediaButtons from './share.component'
// import ScrollableTabsButtonForce from '../../components/collection-item/tabs.component'
class Item extends Component {
    state = {
        item: {

        },
        loading: true,
        items: [],
        share:{
            displayNames: true,
            config: [{
                  facebook: {
                    socialShareUrl: window.location.href,
                  }
                },
                {
                  twitter: {
                    socialShareUrl: window.location.href,
                },
                
            }]
        }
    }
    componentDidMount(){
        const {match} = this.props
        const that = this
        let c = []
        firestore.collection("collections").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
                c.push(doc.data())
                // that.setState({reviews:c})
                c.forEach(item => {
                    item.items.forEach(element => {
                        // console.log(element.slug);
                        let m = '/'.concat(element.slug) 
                        console.log();
                        if (m === encodeURI(match.url)){
                            that.setState({
                                item: element,
                                loading:false
                            })
                        }
                    });
                })
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    render() {  
        if(this.state.loading===true){      
        return (
            <div className="SpinnerOverlay">
                <div className="SpinnerContainer"/>
            </div>
        )
    }
    else{
        const {name,rating,price,photos,breif} = this.state.item
        const {addItem} = this.props;
        return (
            <div style={{overflowX:"none"}}>
            <StyledHero img={Hero}>
                    <Banner title={name} subtitle={`$${price}`}/>
                </StyledHero>
                <div className="item-page">
                <div className="item">
                    <div className="carousel">
                <Carousel >
                {photos.map((item,id)=>(
                                <img alt={name} src={item} />
                            ))
                }
                </Carousel>
                </div>
                <div className="D">
                    <div className="cartPrice">
                        <div className="single">{name}</div>
                        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly/>
                        <div className="singlep">${price}</div>
                        <div className="singleb">
                            <h2>Description</h2>
                            {breif}</div>
                    </div>
                    <div className="breif">
                    <SocialMediaButtons url={window.location.href} breif={breif} name={name}/>
                    <div className="singleb">{breif}</div>
                    <CustomButton className="custom-button" style={{width:"300px",fontSize:"20px"}} onClick={() => addItem(this.state.item)} type="button">
                    <IconButton>
                        <AddShoppingCartIcon style={{color:'white'}} />
                        </IconButton>
                        Add to Cart
                    </CustomButton>
                    </div>
                </div>
                </div> 
                </div>  
                {/* <ScrollableTabsButtonForce description={description} rating={rating} img={imageUrl}/> */}
                </div>  
        )
    }
    }
}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});
export default connect(null,mapDispatchToProps)(Item);