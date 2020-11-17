import React from 'react';
import {connect} from 'react-redux';
import PreviewCollection from '../../components/preview-collection/preview-collection.component'
import {createStructuredSelector} from 'reselect'
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'
import Banner from '../../components/banner'
import StyledHero from '../../components/StyledHero'
import './collections-overview.styles.scss'
import { useState } from 'react';
// import front from '../../assets/home.png'
import FormInput from '../form-input/form-input.component'
import Hero from '../../assets/73931.jpg'
const CollectionOverview = ({ collections }) => {
    const [search,setSearch] = useState({searchField:''})
    const{searchField} = search
    const handleChange = event => {
        const {value,name} = event.target;
        setSearch({...search,[name]: value})
    }
return(
    <>
    <StyledHero img={Hero}>
        <Banner title="SHOP NOW" subtitle={`by NBMJ`}/>
    </StyledHero>
    <div style={{
        padding: '10px',
        margin: '10px'
    }} className='collection-overview'>
  
        <FormInput
 
        id="shop"
        type="text" 
        name="searchField" 
        value={searchField} 
        required 
        handleChange={handleChange}
        label='Search'
        />
         {
            collections.map(({id, ...otherCollectionProps}) =>(
               <PreviewCollection key={id} {...otherCollectionProps} search={searchField}/>
             ))
          }
    </div>
    </>
)
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionOverview) 