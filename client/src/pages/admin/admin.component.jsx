import React,{useState,useEffect,useCallback} from 'react'
import AddProduct from '../../components/addproduct/addproduct.component'
import FormInput from '../../components/form-input/form-input.component';
import { firestore } from '../../firebase/firebase.utils'
import View from '../../components/vieworders/vieworders.component'
import CustomButton from '../../components/custom-button/custom-button.component';
const Admin = ({email})  => {
// console.log(email);
const [home,setHome] = useState({Heading:'',Para:''});
    const firebaseApp = useCallback(() =>{
        firestore.collection("Home").doc("Home").get().then(function(doc) {
            if (doc.exists) {
                setHome(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        
    },[])
    useEffect(() => {
    firebaseApp();
    },[firebaseApp]);
    const handleChange = event => {
        const {value,name} = event.target;
        setHome({...home,[name]: value})
    }
    const handleSubmit = e => {
        e.preventDefault();
        firestore.collection("Home").doc("Home").set({
            Heading : home.Heading,
            Para: home.Para
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    if(email===null){
        return(
            <div></div>
        )
    }
    else{
   return( <div style={{
        margin:'5px',padding:'5px'
    }}>
    {    email.email===process.env.EMAIL?
        <>
        <View/>
        <AddProduct/>
        <form onSubmit={handleSubmit}>
        <FormInput 
        type="text" 
        name="Heading" 
        value={home.Heading} 
        required 
        handleChange={handleChange}
        label='Heading'
        />
          <FormInput 
        type="text" 
        name="Para" 
        value={home.Para} 
        required 
        handleChange={handleChange}
        label='Breif Description'
        />
        <CustomButton type="submit">Submit</CustomButton>
        </form>
        </>
        : <div>404 Page Not Found</div>
    }
        
    </div>)
    }
}
export default Admin