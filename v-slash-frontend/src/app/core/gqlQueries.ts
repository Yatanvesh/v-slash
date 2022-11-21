import { gql } from 'apollo-angular'

export const LIST_SHORTCUTS = gql`
  query userShortcuts(
    $offset: Float
    $limit: Float
    $sortKey: String
    $sortDir: String
  ) {
    userShortcuts(
      offset: $offset
      limit: $limit
      sortKey: $sortKey
      sortDir: $sortDir
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

export const SEARCH_SHORTCUTS = gql`
  query searchShortcut($searchTerm: String!) {
    searchShortcut(searchTerm: $searchTerm) {
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

export const COUNT_SHORTCUTS = gql`
  {
    userShortcutsCount
  }
`

export const DELETE_SHORTCUT = gql`
  mutation deleteShortcut($uid: String!) {
    deleteShortcut(uid: $uid)
  }
`

export const LIST_TAGS = gql`
  {
    tags {
      uid
      tag
    }
  }
`

export const CREATE_TAG = gql`
  mutation createTag($tag: String!) {
    createTag(tag: $tag) {
      tag
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
