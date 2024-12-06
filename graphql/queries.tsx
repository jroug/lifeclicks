import { gql } from "@apollo/client";

export const ALL_DATA = gql`
  query ALL_DATA {
    mainMenuItems: menuItems(where: { location: PRIMARY }) {
      edges {
        node {
          id
          label
          uri
        }
      }
    }
    socialMenuItems: menuItems(where: { location: SOCIAL_MENU }) {
      edges {
        node {
          id
          label
          uri
          target
        }
      }
    }
    pages(where: { status: PUBLISH }, first: 100) {
      nodes {
        id
        title
        slug
        uri
        content
        date
        pageExtras{
          secondaryText
        }
        featuredImage{
          node{
            sourceUrl
            altText
            mediaDetails{
              width
              height
            }
          }
        }
      }
    }
    projects(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      edges {
        node {
          id
          title
          slug
          uri
          projectExtras {
            eventType
            eventPlace
            homepageMedia {
              id
              fullFileUrl
              postMimeType
              postExcerpt
            }
            portfolioPageMedia {
              id
              fullFileUrl
              postMimeType
              postExcerpt
              postTitle
              fullWidth
              fullHeight
            }
          }
        }
      }
    }
  }
`;