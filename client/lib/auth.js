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
    query Query($checkIfUserExistsEmail: String!) {
      checkIfUserExists(email: $checkIfUserExistsEmail)
    }
      `,
    variables: {
      checkIfUserExistsEmail: email,
    }
  });
  console.log(data.checkIfUserExists)
  return data.checkIfUserExists;
}

export const postOtp = async (email) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send`, requestOptions);

  const status = response.status;
  return (status === 200) ? true : false;
};

export const verifyUser = async(email, otp) => {
  const { data } = await client.query({
    query: gql`
    query Query($checkIfOtpMatchesEmail: String!, $checkIfOtpMatchesOtp: String!) {
      checkIfOtpMatches(email: $checkIfOtpMatchesEmail, otp: $checkIfOtpMatchesOtp)
    }
      `,
    variables: {
      checkIfOtpMatchesEmail: email,
      checkIfOtpMatchesOtp: otp
    }
  });

  return data.checkIfOtpMatches ? true : false; 

}