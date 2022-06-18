import { gql } from "apollo-angular";

const ALL_NODES = gql`{
    allNodes {
        id
        date
        maxInviteeCount
        property
    }
  }`

export  {
    ALL_NODES
}