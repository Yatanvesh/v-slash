import { gql } from 'apollo-angular'

export const LIST_SHORTCUTS = gql`
  {
    userShortcuts {
      uid
      shortLink
      fullUrl
      description
      type
      createdAt
      tags {
        tag
      }
    }
  }
`

export const CREATE_SHORTCUT = gql`
  mutation createShortcut(
    $shortLink: String!
    $fullUrl: String!
    $description: String
    $type: String
    $tags: [String!]
  ) {
    createShortcut(
      shortLink: $shortLink
      fullUrl: $fullUrl
      description: $description
      type: $type
      tags: $tags
    ) {
      uid
      shortLink
      fullUrl
      description
      type
      createdAt
      tags {
        tag
      }
    }
  }
`
