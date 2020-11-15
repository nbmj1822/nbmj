import React, { useState} from "react";
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import InputLabel from '@material-ui/core/InputLabel';
import './addproduct.styles.scss'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {addProduct} from '../../firebase/firebase.utils'
import TextField from '@material-ui/core/TextField';
import {auth} from '../../firebase/firebase.utils'
// import SearchLocationInput from '../locationcomplete/locationautocomplete.component'
import 'firebase/storage';
const AddProduct = () => {
    
    const [productData,setProductData] = useState({
        id: Math.floor(Math.random() * 1000000000),
        name: ``,
        file:'',
        imageUrl: '',
        price: '',
        description:'',
        slug: '',
        searchTags: [],
        condition:'',
        photos:[],
        advertised:false,
        soldBy: '',
        email:  '',
        phone:'',
        location:'',
        date : new Date(),
        sold:false,
        documentTo : '',
        preciseLocation:'',
        search: ''
    })
    const useStyless = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        input: {
          display: 'none',
        },
      }));
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

  const classes = useStyles();
  const classe = useStyless();
  const [progress, setProgress] = React.useState(0);
    const documents = [
        
    ]
    const {name,description,price,imageUrl,search,photos,documentTo,id,searchTags,condition,phone,location,preciseLocation} = productData
    const handleChange = event => {
        const {value,name} = event.target;
        setProductData({...productData,[name]: value})
    }
    const onAdd = ()=> {
        if(searchTags.length<=10){
            let arr = searchTags
            searchTags.push(search)
            console.log(productData);
        setProductData({...productData,searchTags: arr})
        }
    }
    const [loading,setLoading] = React.useState(false);
    const handleImage = event => {
        // const {value,name} = event.target
        // setProductData({...productData,[name]: value})
        var storageRef = firebase.storage().ref();
            var fil = event.target.files[0]
        var uploadTask = storageRef.child('images/' + fil.name).put(fil);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setLoading(true)
            setProgress(progress);
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                alert('Upload Paused')
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                // alert(`File is Uploading ${progress}%`);
                // setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + progress));
                // setLoading({loading:true})
                break;
            default:
                console.log();
            }
        }, function(error) {
        switch (error.code) {
            case 'storage/unauthorized':
            alert('Upload Failed')
            break;
            case 'storage/canceled':
                alert('Upload Failed')
            break;
            case 'storage/unknown':
                alert('Upload Failed')
            break;
            default:
                console.log();
        }
        }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            let v = photos
            v.push(downloadURL);
            setLoading(false)
            setProductData({...productData,photos:v})
        });
        });
    }
    const handleSubmit = async event => {
        event.preventDefault();
        let product = {
            id:id,
            name: name,
            imageUrl: imageUrl,
            price: price,
            description:description,
            slug: `shop/${documentTo}/${encodeURI(name).toLowerCase()}`,
            searchTags: searchTags,
            condition:condition,
            photos:photos,
            advertised:false,
            soldBy:auth.currentUser.displayName,
            email:auth.currentUser.email,
            phone:phone,
            location:location,
            preciseLocation: preciseLocation,
            sold:false
        }
        addProduct(product,documentTo)
        setProductData({
            id: Math.floor(Math.random() * 1000000000),
            name: '',
            quantity: '',
            unit: '',
            description : '',
            price: 0,
            imageUrl: '',
            file: '',
            documentTo : ''
        })
    }
    const selectPrimary = (prim) => {
        setProductData({...productData,imageUrl:prim})
    }
    return(
        <div style={{padding:"40px",margin:"30px"}}>
            <h1>Sell your product</h1>
            <form onSubmit={handleSubmit}>
                <div className="group-info">
                <div className="product-info">
                    <h2>Product Information</h2>
                    <FormInput 
                    type="text" 
                    name="name" 
                    value={name} 
                    required 
                    handleChange={handleChange}
                    label='Product Name'
                     />
                     <FormInput 
                    type="tel" 
                    name="price" 
                    value={price} 
                    required 
                    handleChange={handleChange}
                    label='Product Price'
                    />
                    <FormInput 
                    type="text" 
                    name="location" 
                    value={location} 
                    handleChange={handleChange}
                    label="Address"
                    // disabled
                    required
                    >
                    </FormInput>
                    <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    required
                    handleChange={handleChange}
                    defaultValue={description}
                    variant="outlined"
                    style={{marginBottom:'10px',width:"100%"}}
                    />
                    <br/><br/>
                    <div>
                    <FormInput 
                    type="text" 
                    name="search" 
                    value={search} 
                    required
                    handleChange={handleChange}
                    label='Search Tags'
                    >
                    </FormInput>
                    
                    {
                        searchTags.map(s => {
                            console.log(s);
                            console.log(searchTags);
                            return(
                            <ul style={{display:"inline"}}>
                            <li style={{display:"inline-block",background:"#144dde",border:"1px solid #144dde",color:"white",borderRadius:"20px",padding:"10px",margin:"10px"}}>{s}</li>
                            </ul>
                        )})
                        }<button style={{background:"#144dde",border:"1px solid #144dde",color:"white",borderRadius:"20px",padding:"10px",margin:"10px"}} type="button" onClick={onAdd}>Add</button>
                    </div>
                <FormControl className={classes.formControl}>
                <Select
                value={documentTo}
                onChange={handleChange}
                displayEmpty
                name="documentTo"
                required
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="" disabled>
                    Categories
                </MenuItem>
                {
                    documents.map(document=>(
                        <MenuItem key={document} value={document}>{document}</MenuItem>
                    ))
                }
                </Select>
                </FormControl>
                <br/><br/>
                <FormControl className={classes.formControl}>
                <Select
                value={condition}
                onChange={handleChange}
                displayEmpty
                name="condition"
                required
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="" disabled>
                    Condition 1 for Old 5 for New
                </MenuItem>
                     <MenuItem value={1}>1</MenuItem>
                     <MenuItem value={2}>2</MenuItem>
                     <MenuItem value={3}>3</MenuItem>
                     <MenuItem value={4}>4</MenuItem>
                     <MenuItem value={5}>5</MenuItem>
                </Select>
                </FormControl>
                </div>
                
                
                <div className="image-info">
                    <h2>Images</h2>
    <div className={classe.root}>
      <input
        accept="image/*"
        className={classe.input}
        id="contained-button-file"
        multiple
        type="file"
        name="file" onChange={handleImage}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Images
        </Button>
      </label>
      <input accept="image/*" className={classe.input} id="icon-button-file" name="file" onChange={handleImage} type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
    </div>  
    <div > 
        { 
              loading===true ? <CircularProgress variant="static" value={progress}/>
            : photos.map(img=>(
                <div style={{display:"inline-block",padding:"10px",margin:"10px"}}>
                <div style={{display:"flex",flexDirection:"column",width:"300px",height:"300px",padding:"10px",margin:"10px"}}>
                <img src={img} alt={name} width="300" height="300"/>
                <button type="button" style={{background:"#144dde",border:"1px solid lightblue",color:"white",borderRadius:"20px",padding:"10px",margin:"10px"}} onClick={() => selectPrimary(img)}>Select as primary photo</button>
                </div>
                </div>
            ))
        }
    </div>
    </div>
        <CustomButton className="submit" type="submit">Submit</CustomButton>
      </form>
        </div>
    )
}
export default AddProduct;