import React,{useState} from 'react'
import {firestore} from '../../firebase/firebase.utils'
import CustomButton from '../custom-button/custom-button.component'
import './vieworders.styles.scss'
const View = () => {
    const[orders,setOrders] = useState({
        ordered : [],
        loading: false
    })
    const {ordered,loading} = orders
    const getOrder = () => {
        var c = [];
        setOrders({...orders,loading:true})
        firestore.collection("orders").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
                c.push(doc.data())                
            });
            setOrders({...orders,ordered:c})
            console.log(ordered);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    return(
        <div style={{margin:'10px',padding:'10px'}}onClick={getOrder}>
            <CustomButton type="button" >View Orders</CustomButton>
            {ordered.length===0 ? 
            <div>
            {   loading===true ? <div className="SpinnerOverlay">
                    <div className="SpinnerContainer"/>
                    </div>
                : <div/>    
                }
                    
            </div>
            : <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Postal Code</th>
                            <th>Email</th>
                            <th>Phone #</th>
                            <th>Date and Time</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                        <tbody>
                        {
                            ordered.map(order => (
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.user_name}</td>
                                    <td>{order.address}</td>
                                    <td>{order.postcode}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.time}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.paymentMethod}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                </table>
            </div>
        }
        </div>
    )
}
export default View;