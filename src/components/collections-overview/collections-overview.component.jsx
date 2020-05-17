import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
 
import CollectionPreview from '../collection-preview/collection-preview.component';
import Spinner from '../spinner/spinner.component';
 
import './collections-overview.styles.scss';
 
const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
 
const CollectionsOverview = () => {
  const { loading, data, error } = useQuery(GET_COLLECTIONS);
  
  if (loading) return <Spinner />;
  const { collections } = data;
 
  return  (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  )
};
 
export default CollectionsOverview;