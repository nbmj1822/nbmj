import React,{useState} from 'react'
import './cashondelivery.styles.scss'
import { connect } from "react-redux";
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {firestore} from '../../firebase/firebase.utils'
import { createStructuredSelector } from "reselect";
import { selectCartItems,selectCartTotal } from "../../redux/cart/cart.selectors";

const CashOnDelivery = ({total,cartItems}) => {
    const getCurrentDate = () => {
        var currentdate = new Date(); 
        var datetime =  
        currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + "  "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
        return datetime;
        }
    const [deliveryForm,setDeliveryForm] = useState({
        address: '',
        email: '',
        user_name: '',
        phone: '',
        time: getCurrentDate(),
        id: Math.floor(Math.random() * 1000000000),
        amount: total,
        postcode: '',
    })
   const {address,email,user_name,phone,time,id,amount,postcode} = deliveryForm
    const handleChange = event => {
        const {value,name} = event.target;
        setDeliveryForm({...deliveryForm,[name]: value})
    }
    const handleSubmit = async event => {
        event.preventDefault();
        firestore.collection('orders').add({
            address: address,
            email: email,
            user_name: user_name,
            phone: phone,
            time: time,
            id: id,
            amount: amount,
            postcode: postcode,
            paymentMethod: 'COD',
            cartItems: cartItems,
        })
        .then(function(){
          //   fetch('/adminemail',{
          //   method:'post',
          //   headers: {'Content-Type': 'application/json'},
          //   body: JSON.stringify({
          //       address: address,
          //       email: email,
          //       user_name: user_name,
          //       phone: phone,
          //       time: time,
          //       id: id,
          //       amount: amount,
          //       postcode: postcode,
          //       paymentMethod: 'COD',
          //       cartItems: cartItems,
          //   })
          // })
          // .then(respone=>respone.json())
          // .then(res =>{
          //   console.log(res)
          // })
          // .catch(error=>{console.log(error);})
            setDeliveryForm({
                address: '',
                email: '',
                user_name: '',
                phone: '',
                time: getCurrentDate(),
                id: Math.floor(Math.random() * 1000000000),
                amount: total,
                postcode: ''
            })
            alert('Order confirmed')
        })
        .catch(function(error){
            alert('Order could not be placed please try again')
        })
    }
    return(
        <div className="cashOnDelivery3">
          <div className="cashOnDelivery">
            <h1 style={{color:"#dd3333"}}>Your Total is ${total}</h1>
            <h2>Cash on Delivery</h2>
            <p>Please fill in your information correctly</p>
            <form onSubmit={handleSubmit}>
                <FormInput 
                type="email" 
                name="email" 
                value={email} 
                required 
                handleChange={handleChange}
                label='Email'
                />
                <FormInput 
                type="text" 
                name="user_name" 
                value={user_name} 
                required 
                handleChange={handleChange}
                label='Name'
                />
                <FormInput 
                type="text" 
                name="address" 
                value={address} 
                required 
                handleChange={handleChange}
                label='Address'
                />
                <FormInput 
                type="text" 
                name="postcode" 
                value={postcode} 
                required 
                handleChange={handleChange}
                label='Postal Code'
                />
                <FormInput 
                type="tel" 
                name="phone" 
                value={phone} 
                required 
                handleChange={handleChange}
                label='Contact Number'
                />
                <CustomButton type='submit'>Place Order</CustomButton>
            </form>
            </div>
            {/* <SimpleCard total={total} cartItems={cartItems}/> */}
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
  cartItems : selectCartItems,
  total: selectCartTotal
})
export default connect(mapStateToProps)(CashOnDelivery);
