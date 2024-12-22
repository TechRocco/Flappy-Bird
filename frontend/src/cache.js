import { makeVar, InMemoryCache } from '@apollo/client';


const isLoggedInFromStorage = localStorage.getItem('token') ? true : false;

export const isLoggedInVar = makeVar(isLoggedInFromStorage); // Default value is false

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