import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
   margin-bottom: 50px;
`;

export const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

export const PreviewContainer = styled.div`
display: grid;
grid-template-columns: 0fr 0fr 0fr 0fr;
grid-gap: 0px;
column-gap: 0px;
@media screen and (max-width:800px){
  grid-template-columns: 0fr;
}
`;