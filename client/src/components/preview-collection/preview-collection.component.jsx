import React from 'react';
import { withRouter } from 'react-router-dom';
import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './preview-collection.styles';
const PreviewCollection = ({ title, items, history, match, routeName,search }) => {
  // console.log(items);
  // console.log(`${match.path}/${routeName}/`);
  let filteredRobots = items.filter((item,i) =>{
    return item.name.toLowerCase().includes(search)
  });
  return(<CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {filteredRobots
        .map(item => (
          <CollectionItem key={item.id} item={item} title={title} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
)
};

export default withRouter(PreviewCollection);