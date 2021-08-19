import Head from 'next/head';
import Link from 'next/link';
import Users from '../components/Users';
import Orders from '../components/order';
import Items from '../components/item';
import {ApolloClient, InMemoryCache, ApolloProvider,HttpLink,from,} from '@apollo/client';
import {onError} from '@apollo/client/link/error';


export default function GraphQLDemo() {
    const errorLink= onError(({graphqlErrors,networkError})=>{
        if(graphqlErrors){
            graphqlErrors.map(({message,location,path})=>{
                alert(`GraphQL error ${message}`);
            });
        }
    })
    const link = from([
        errorLink,
        new HttpLink({uri:"http://localhost:5000/graphql"}),
    ]);
   const client =new ApolloClient({
       cache:new InMemoryCache(),
       link:link,
   })
    

    return (
        <>
          <Head>
                <title>User</title>
            </Head>
        <div >
           <ApolloProvider client={client}>
           {" "}
           <Users/>
           <Orders/>
           <Items/>
           </ApolloProvider>;
        </div>
        </>
    );
};
