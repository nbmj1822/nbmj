import React from 'react';
import './menu-item2.styles.scss'
import {withRouter} from 'react-router-dom';
const MenuItem = ({title,size,imageUrl,history,routeName,}) => {
    console.log(imageUrl);
   return( 
    <div className={`${size} menu-item2`} 
    onClick={() => history.push(`/${routeName}`)}>
        <div className="background-image2" 
        style={{
            backgroundImage: `url(${imageUrl})`
        }}>
            
    </div>
        <div className="content2">
            <h1 className="title2">{title.toUpperCase()}</h1>
            <span className="subtitle2">SHOP NOW</span>
        </div>
    </div>
 
   );
}
export default withRouter(MenuItem);