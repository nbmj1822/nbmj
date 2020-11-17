import React from 'react'
import AddProduct from '../../components/addproduct/addproduct.component'
import View from '../../components/vieworders/vieworders.component'
const Admin = ({email})  => {
console.log(email);
    if(email===null){
        return(
            <div></div>
        )
    }
    else{
   return( <div style={{
        margin:'5px',padding:'5px'
    }}>
    {    email.email==='shujaali1234@gmail.com'?
        <>
        <View/>
        <AddProduct/>
        </>
        : <div>404 Page Not Found</div>
    }
        
    </div>)
    }
}
export default Admin