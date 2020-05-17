import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CollectionItem from '../../components/collection-item/collection-item.component';
import Spinner from '../../components/spinner/spinner.component';
import './collection.styles.scss';


const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!){   # GraphQL language
    getCollectionsByTitle(title: $title){         # (argument: $variable)
      id
      title
      items{
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPage = ({ match }) => {
  const { loading, data } = 
    useQuery(GET_COLLECTIONS_BY_TITLE, {
      variables: { title: match.params.collectionId }
    });

  if (loading) return <Spinner />;
  
  const { getCollectionsByTitle } = data;
  const { title, items } = getCollectionsByTitle;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
