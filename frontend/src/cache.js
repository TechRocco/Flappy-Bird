import { makeVar, InMemoryCache } from '@apollo/client';

export const isLoggedInVar = makeVar(false); // Default value is false

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    },
                },
            },
        },
    },
});

export default cache;