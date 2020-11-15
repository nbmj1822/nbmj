import React,{useEffect} from 'react'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import {Route } from 'react-router-dom'
import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container'
import {connect} from 'react-redux'
import CollectionsPageContainer from '../collection/collection.container'
// import Directory from '../../components/directory/directory2.component'
import Item from '../item/item.component'
const ShopPage = ({match,fetchCollectionsStart}) => {

    useEffect(()=>{
        fetchCollectionsStart();
    },[fetchCollectionsStart])
       return (
            <div className="shop-page">
                <Route 
                exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
                />
                <Route exact path={`${match.path}/:collectionId/:collectionsId`} component={Item}/>

                <Route 
                exact
                path={`${match.path}/:collectionId`}
                component={CollectionsPageContainer}
                 />
            </div>

        );
    }
const mapDispatachToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null,mapDispatachToProps)(ShopPage);