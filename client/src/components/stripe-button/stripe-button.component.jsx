import { PayPalButton } from "react-paypal-button-v2";
import React from 'react' 
import {firestore} from '../../firebase/firebase.utils'
export default class PayPalCheckout extends React.Component{ 
  getCurrentDate = () => {
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
  render() {
    const {price,items} = this.props
    return (
        <PayPalButton
        amount={price}
        currency="USD"
        options={{
          clientId: process.env.PAYPAL
      }}
        onSuccess={(details, data) => {
           var address = details.payer.address.address_line_1.concat('  ',details.payer.address.admin_area_1,'  ',details.payer.address.admin_area_2,'  ',details.payer.address.country_code)
            var user_name = details.payer.name.given_name.concat('  ',details.payer.name.surname)
            var time = this.getCurrentDate()
           firestore.collection('orders').add({
            address: address,
            email: details.payer.email_address,
            user_name: user_name,
            phone:details.payer.phone.phone_number.national_number,
            time: time,
            id: Math.floor(Math.random() * 1000000000),
            amount: price,
            postcode: details.payer.address.postal_code,
            paymentMethod: 'Online Paid',
            cartItems: items
      })
      .then(function(){
          alert('Order confirmed')
          fetch('/adminemail',{
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              address: address,
              email: details.payer.email_address,
              user_name: user_name,
              phone:details.payer.phone.phone_number.national_number,
              time: time,
              id: Math.floor(Math.random() * 1000000000),
              amount: price,
              postcode: details.payer.address.postal_code,
              paymentMethod: 'Online Paid',
              cartItems: items
            })
          })
          .then(respone=>respone.json())
          .then(res =>{
            console.log(res)
          })
      })
      .catch(function(error){
          alert('Order could not be placed please try again')
      })
        }}
      />
    );
  }
}