import React,{useState} from 'react';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormInput from '../components/form-input/form-input.component'
import CustomButton from '../components/custom-button/custom-button.component'
import TextField from '@material-ui/core/TextField';
const Contact = () => {
    const [userCredentials,setCredentials] = useState({email:'',name:'',message:''})
        const {email,name,message} = userCredentials
        const useStyles = makeStyles((theme) => ({
            root: {
              '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
              },
            },
          }));
        const handleSubmit = async event => {
            event.preventDefault();
            // emailSignInStart(email,password);
            // // try {
            // //     await auth.signInWithEmailAndPassword(email,password);
            // //     this.setState({email:'',password:''})
            // // } catch (error) {
            // //     console.log(error)
            // // }
        }
        const handleChange = event => {
            const {value,name} = event.target;
            setCredentials({...userCredentials,[name]: value})
        }
        return(
    <div style={{margin:'30px',padding:'40px'}}>
        <h1>Contact Us</h1>
        <p style={{fontSize:"20px"}}>
        If you have a query/feedback or want to know more about our services, you can write to us at support@uzabl.com.
<br/>
<br/>
Alternatively, you can fill this form to reach us.
       </p>
       <form style={{width:"50%"}} onSubmit={handleSubmit}>
       <FormInput 
                    type="text" 
                    name="name" 
                    value={name} 
                    required
                    label="Name"
                    handleChange={handleChange}
                    />
       <FormInput 
                    type="email" 
                    name="email" 
                    value={email} 
                    required 
                    handleChange={handleChange}
                    label='Email'
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label="Note"
                    name="message"
                    multiline
                    rows={4}
                    defaultValue={message}
                    variant="outlined"
                    style={{marginBottom:'10px'}}
                    />
                    {/* <CustomButton type="submit">Submit</CustomButton> */}
        <CustomButton className="submit" type="submit">Submit</CustomButton>

       </form>
       <p>Please use <span style={{color:"blue"}}>scamalert@uzabl.com</span> to report scam or fake listings or sellers.</p>
    </div>
)
        }
export default Contact;