import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`

export default (email, password, callback) => {
  const variables = {
    email,
    password,
    clientMutationId: ""
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response)
        const token = response.authenticateUser.token
        const id = response.authenticateUser.id
        callback(id, token)
      },
      onError: err => console.error(err),
    },
  )
}
