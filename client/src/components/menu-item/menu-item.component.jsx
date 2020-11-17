import React from 'react';
import './menu-item.styles.scss'
import {withRouter} from 'react-router-dom';
const MenuItem = ({title,size,imageUrl,history,match}) => {
   return( 
    <div className={`${size} menu-item`} 
    onClick={() => history.push(`/shop/${encodeURI(title).toLowerCase()}`)}>
        <div className="background-image" 
        style={{
            backgroundImage: `url(${imageUrl})`
        }}>
    </div>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
   );
}
export default withRouter(MenuItem);