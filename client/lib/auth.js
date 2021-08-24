import client from "../apollo-client";
import { gql } from "@apollo/client";

export const signUpUser = async (email, fullName, phoneNumber) =>{
    const response = await client.mutate({
        mutation: gql`
        mutation CreateUserMutation($email: String!, $fullName: String!, $phoneNumber: String!) {
            createUser(email: $email, fullName: $fullName, phoneNumber: $phoneNumber) {
              id
              email
            }
          }
      `,
      variables: {
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber
      }
    });
    if(response.errors === undefined)
    {
        alert("User has been successfully added");
    }
    else
    {
        alert("Error occured while adding the user. Please try again.")
    }
}

export const checkIfUserExists = async(email) =>{
  const { data, loading, error } = useQuery(CHECK_IF_USER_EXISTS,
    {
        variables: {
          userExistsEmail2: email
        }
    });

    
    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;

    const user = Object.values(data);

    return user;
}

export const postOtp = async(email) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    };
    const response = await fetch("http://localhost:5000/send", requestOptions);

    const status = response.status; 
    if(status === 200)
    {
        return true
    }
    else
    {
        return false;
    }
  };