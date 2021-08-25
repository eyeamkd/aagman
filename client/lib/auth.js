import client from "../apollo-client";
import { gql } from "@apollo/client";

export const signUpUser = async (email, fullName, phoneNumber) => {
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
  if (response.errors === undefined) {
    alert("User has been successfully added");
  }
  else {
    alert("Error occured while adding the user. Please try again.")
  }
}

export const checkIfUserExists = async (email) => {
  const { data } = await client.query({
    query: gql`
        query Query($userExistsEmail2: String!) {
          userExists(email: $userExistsEmail2) {
            email
            fullName
            storeName
            GSTNumber
            location
            phoneNumber
        }
        }
      `,
    variables: {
      userExistsEmail2: email,
    }
  });

  return data.userExists;
}

export const postOtp = async (email) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  };
  const response = await fetch("http://localhost:5000/send", requestOptions);

  const status = response.status;
  if (status === 200) {
    return true
  }
  else {
    return false;
  }
};

export const verifyUser = async(email, otp) => {
  const { data } = await client.query({
    query: gql`
        query Query($email: String!) {
          userExists(email: $email) {
            email
            otp
        }
        }
      `,
    variables: {
      email: email,
    }
  });

  if(data.userExists.otp === otp)
  {
    return true;
  }
  else{
    return false;
  }
}