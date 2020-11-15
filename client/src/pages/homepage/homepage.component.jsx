import Home  from './home.component';
import React from 'react';
import Directory from '../../components/directory/directory.component'
import {HomePageContainer} from './homepage.styles'
const HomePage = () =>{
return(
    <HomePageContainer>
        <Home/>
        <Directory id="categories"/>
    </HomePageContainer>);
}
export default HomePage; 