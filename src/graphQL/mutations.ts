import {gql} from '@apollo/client/core';

export const Authenticate = gql`
    mutation Authenticate($username: String!, $password: String!) {
        authenticate(username: $username, password: $password) {
            token
        }
    }
`;

export const SetBookmarks = gql`
    mutation SetBookmarks($bookmarks: [BookmarkInput]!) {
        setBookmarks(bookmarks: $bookmarks)
    }
`;
