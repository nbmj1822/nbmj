import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.div`
    height: 70px;
    width: 95%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    @media screen and (max-width:800px){
        
        padding: 10px;
        margin-bottom: 20px;
        flex-direction: column;
      
    }
`;
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
    @media screen and (max-width:800px){
        width: 100%;
        padding: 5px;
        justify-self: center;
        padding-left : 35vw;
        margin-bottom:10px;
    }
`;
export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    @media screen and (max-width:800px){
        width: 100%;
        padding: 0px;
        margin:10px 0;
        justify-content: center;
        margin-bottom:10px;
    }
`;
export const OptionLink = styled(Link)`
padding: 10px 15px;
cursor: pointer;
word-wrap: none;
`