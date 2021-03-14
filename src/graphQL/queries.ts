import {gql} from '@apollo/client/core';

export const Authentication = gql`
    query Authentication {
        authentication {
            token
        }
    }
`;
