import {gql} from '@apollo/client/core';

export const Authentication = gql`
    query Authentication {
        authentication {
            token
        }
    }
`;

export const Bookmarks = gql`
    query Bookmarks {
        bookmarks {
            id
            name
            url
            order
        }
    }
`;
