import React from 'react'
import './home.styles.scss'
import Land from '../../assets/land.png'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div className={`homes`} 
           >
        <div className="background-image" 
        style={{
            backgroundImage: `url(${Land})`
        }}>
     </div>
        <div className="content">
            <h1 className="title">Heading </h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat deleniti harum asperiores officia laborum ipsam odio dignissimos maiores ducimus reprehenderit autem esse necessitatibus cumque dolores iure, quia temporibus blanditiis alias?</p>
            <Link to="/shop"><Button style={{background:"#dd3333"}} variant="contained" size="large" color="primary" >
          Shop Now
        </Button></Link>
        </div>
    </div>
    )
}
