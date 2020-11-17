import React,{useEffect,useCallback,useState} from 'react'
import './directory.styles.scss'
import {firestore} from '../../firebase/firebase.utils'
import { createStructuredSelector } from "reselect"; 
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import MenuItem from '../menu-item/menu-item.component'
import {connect} from 'react-redux'
const Directory = () => {
    const [categories,setCategories] = useState([]);
    const firebasea = useCallback(() =>{
        firestore.collection("categories").doc("categories").get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data().sections);
                console.log(doc.data());
                setCategories(doc.data().sections)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        
    },[])
    useEffect(() => {
        firebasea();
    },[firebasea]); 
    return(
            <div onClick={firebasea} className="directory-menu">
                {
                    categories.map(({id, ...otherSectionProps}) =>(
                        <MenuItem key={id} {...otherSectionProps}/>
                    ))
                }
                 </div>
        );
            }
const MapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
}) 
    

export default connect(MapStateToProps)(Directory);