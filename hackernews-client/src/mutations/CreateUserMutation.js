import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUserMutation($email: String!, $passwordHash: String!, $name: String!) {
    signupUser(email: $email, password: $passwordHash, name: $name) {
      id
      token
    }

    authenticateUser(email: $email, password: $passwordHash) {
      token
    }
  }
`

export default (name, email, password, callback) => {
  const variables = {
    name,
    email,
    clientMutationId: "",
    passwordHash: password,
  }

  console.log(variables)

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response)
        const id = response.signupUser.id
        const token = response.authenticateUser.token
        callback(id, token)
      },
      onError: err => console.error(err),
    },
  )
}
