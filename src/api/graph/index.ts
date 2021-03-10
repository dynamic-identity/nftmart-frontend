import { globalStore } from 'rekv';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { DBURL } from '../../constants';

export const newClient = (opt = {}) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    ...opt,
  });
  return client;
};

export const getClient = () => {
  const client = newClient({ uri: DBURL });
  return client;
};

const GET_MY_WALLET = gql`
  query {
    user {
      wallet {
        id
      }
      hasMore
    }
  }
`;

const GET_MY_COLLECTIONS = gql`
  query {
    collections(user: "A") {
      collections {
        categoryId
      }
      hasMore
    }
  }
`;

const GET_COLLECTIONS = gql`
  query {
    collections {
      collections {
        name
        id
      }
      hasMore
    }
  }
`;

const GET_ITEMS = gql`
  query GetItems($page: Int, $pageSize: Int, $collectionId: Int, $categoryId: Int, $status: Int) {
    assets(
      page: $page
      pageSize: $pageSize
      collectionId: $collectionId
      status: $status
      categoryId: $categoryId
    ) {
      assets {
        id
        name
        picUrl
        price
        status
        categoryId
        collectionId
      }
      hasMore
    }
  }
`;

// export query result for collections , use fetchMore to load more paginations
export const GetItems = (vars = {}) => {
  return useQuery(GET_ITEMS, {
    variables: { page: 1, pageSize: 10, ...vars },
  });
};

// export query result for collections , use fetchMore to load more paginations
export const GetCollections = (vars = {}) => {
  return useQuery(GET_COLLECTIONS, {
    variables: { offset: 0, limit: 20, ...vars },
  });
};
