import React,{useEffect} from 'react';
import './App.scss';
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Checkout from './pages/checkout/checkout.component'
import Header from './components/header/header.component';
import {checkUserSession} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCollectionsForPreview} from './redux/shop/shop.selectors'
import About from './pages/about/about.component'
import Privacy from './pages/privacy/privacy.component'
// import {addCollectionAndDocuments} from './firebase/firebase.utils'
// import collections from './shop.data'
// import Refund from './pages/refund/refund.component'
import CashOnDelivery from './components/cashondelivery/cashondelivery.component'
import Term from './pages/term/term.component'
import Premium from './pages/premium.component'
import Contact from './pages/contactus.component'
import Safety from './pages/stayingsafe.component'
import Directory from './components/directory/directory.component'
import Admin from './pages/admin/admin.component'
import AddProduct from './components/addproduct/addproduct.component';
// import { HomePageContainer } from './pages/homepage/homepage.styles';
const App = ({checkUserSession,currentUser})  => {
  
  useEffect(() => {
    checkUserSession();
  },[checkUserSession]); 
  // unsubscriberFromAuth = null
 // componentDidMount(){
  // useEffect(()=>{ Unmount
  //   const unsubscriberFromCollection = firestore
  //   .collection('collections')
  //   .onSnapshot(onSnapshot => console.log(snapshot))
  //   return  () => {
  //     unsubscriberFromCollection();
  //   }
  // })
   
  //  const {setCurrentUser} = this.props
    // this.unsubscriberFromAuth = auth.onAuthStateChanged(async userAuth=>{
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot =>{
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         });
    //     });
    //   }
    //   setCurrentUser(userAuth)
    //   
    // });
 // }
  // componentWillUnmount(){
  //   this.unsubscriberFromAuth();
  // }
  // const addDocument = () => {
  //   addCollectionAndDocuments
  //   ('collections',
  //   collections.map(({title,items})=> ({title,items})));
  // }
  // addDocument()
    return (
      <div>
        {/* <CollapsibleTable/> */}
        <Header/>
        {/* <button type="button" onClick={addDocument()}>Add Items to Firebase</button> */}
        <Switch>
          {/* <Route exact path='/' render={()=>(<Redirect to='/shop'/>)}/> */}
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/categories' component={Directory}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/prohibited' component={Term}/>
          <Route exact path='/ethicaluse' component={Privacy}/>
          <Route exact path='/premium' component={Premium}/>
          <Route exact path='/contactus' component={Contact}/>
          <Route exact path='/stayingsafe' component={Safety}/>
          <Route exact path='/sellsomething' component={AddProduct}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route  exact path='/signin' render={() => currentUser ? (<Redirect to='/'/>) : (<SingInAndSignUpPage/>)} />
          <Route exact path='/admin' render={()=><Admin email={currentUser}/>}/>
          <Route exact path="/payment" render={()=> <CashOnDelivery/>}/>
        </Switch>
      </div>
    );
  }

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
