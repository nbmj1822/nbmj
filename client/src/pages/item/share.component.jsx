import React from 'react'
// import { Button, Glyphicon } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

import {
    FacebookShareButton,
    TwitterShareButton,
    EmailShareButton,
    WhatsappShareButton
} from 'react-share';



const WrapShareButtons = styled.div`

    & > .SocialMediaShareButton {
      display: inline-block;
      margin: 10px 10px;
      margin-right: 10px;
      padding:10px;
    }

    & > .SocialMediaShareButton > .btn {
        width: 64px;
        height: 32px;
        padding: 0;
        border-radius: 0;
        border: 0;
    }

    & > .SocialMediaShareButton--facebook > .btn,
    & > .SocialMediaShareButton--facebook > .btn:hover,
    & > .SocialMediaShareButton--facebook > .btn:active,
    & > .SocialMediaShareButton--facebook > .btn:focus  {
        background: #3B568D /*blue*/;
    }

    & > .SocialMediaShareButton--twitter > .btn,
    & > .SocialMediaShareButton--twitter > .btn:hover,
    & > .SocialMediaShareButton--twitter > .btn:active,
    & > .SocialMediaShareButton--twitter > .btn:focus  {
        background: #00ADE8;
    }

    & > .SocialMediaShareButton--email > .btn {
      background:white;
      border: #00ADE8 1px solid;
    }
    & > .SocialMediaShareButton--email > .btn > .glyphicon{
      font-size: 18px;
      line-height: 25px;
      color: #00ADE8;
    }
    & > .SocialMediaShareButton > .btn > img {
        height: 32px;
    }
`

const SocialMediaButtons = ({name,breif,url}) => (
  <WrapShareButtons>
    <FacebookShareButton
      url={url}
      quote={`${name} ${breif}`}>
      <Button><FacebookIcon/></Button>
    </FacebookShareButton>

    <TwitterShareButton
      url={url}
      title={name}>
      <Button><TwitterIcon/></Button>
    </TwitterShareButton>

    <WhatsappShareButton
        url={url}
        title={breif}
        separator=":: ">
      <Button><WhatsappIcon/></Button>
    </WhatsappShareButton>
    <EmailShareButton
      subject={`Check out this new product I found`}
      body={`${breif}: ${url}`}>
      <Button><EmailIcon/></Button>
    </EmailShareButton>
  </WrapShareButtons>
)

export default SocialMediaButtons
