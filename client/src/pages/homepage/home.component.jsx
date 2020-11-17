import React,{useState,useEffect,useCallback} from 'react'
import './home.styles.scss'
import Land from '../../assets/land.png'
import {firestore} from '../../firebase/firebase.utils'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
export default function Home() {
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
    return (
        <div className={`homes`}>
        <div className="background-image" 
        style={{
            backgroundImage: `url(${Land})`
        }}>
     </div>
        <div className="content">
            <h1 className="title">{home.Heading} </h1>
            <p>{home.Para}</p>
            <Link to="/shop"><Button style={{background:"#dd3333"}} variant="contained" size="large" color="primary" >
          Shop Now
        </Button></Link>
        </div>
    </div>
    )
}
