import React from 'react';
import Button from '@material-ui/core/Button';
const Premium = () => (
    <div style={{margin:'30px',padding:'40px'}}>
        <h1>Premium Members</h1>
        <p style={{fontSize:"20px"}}>
        Premium Members get to post unlimited ads and reach more potential buyers. Here’s what you’ll be able to do with your premium membership:
<ol>
<li>Unlimited Postings (up to 100) for 30 days.
<br/>
Regular members can post up to 5 Ads per week. As a premium member you can sell unlimited number of items. We limit it to 100 ads, because we want to keep the platform safe and free from abuse. We hope 100 is a great number! Just in case you need more than 100 postings, you can write to us and we’ll carefully take up your case and offer you more.
</li>
<li>Analytics
<br/>
Get the views count on your postings. You’ll know which ones are performing better, and make changes to those that are under performing – you might want to follow the pattern of postings that got more views.
</li>
<li>Add-Ons
<br/>
We’re working on introducing more services for premium members like goodies, rewards for selling a certain number of items, premium badges, and even free subscription to some interesting online content. Stay tuned!
</li>
</ol>
<Button variant="contained" size="large" color="primary" >
          Join Now
        </Button>
       </p>
    </div>
)
export default Premium;