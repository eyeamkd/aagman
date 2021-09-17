import {gql} from '@apollo/client'

export const DELETE_DEVICE=gql`
mutation DeleteDeviceMutation($deleteDeviceFcmToken: String!) {
    deleteDevice(fcmToken: $deleteDeviceFcmToken)
  }
`