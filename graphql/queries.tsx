import { gql } from "@apollo/client";

export const ALL_DATA = gql`
  query ALL_DATA {
    mainMenuItems: menuItems(where: { location: PRIMARY }) {
      edges {
        node {
          id
          label
          uri
          target
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
    posts(where: { status: PUBLISH }, first: 12) {
      nodes {
        id
        title
        slug
        uri
        content
        date
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
    videos(where: { orderby: { field: MENU_ORDER, order: ASC } }, first: 100) {
      edges {
        node {
          id
          title
          slug
          uri
          videosExtras {
              vimeoId
              youtubeId
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
    }
    projects(where: { orderby: { field: MENU_ORDER, order: ASC } }, first: 100) {
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
              fullWidth
              fullHeight
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
    currentDateTime:currentDateTime
  }
`;

export const SEND_EMAIL = gql`query SEND_EMAIL(
  $form_name: String, 
  $form_email: String, 
  $form_location: String, 
  $form_eventType: String, 
  $form_role: String, 
  $form_hear: String, 
  $form_date: String, 
  $form_eventLocation: String, 
  $form_budget: String, 
  $form_message: String){
    emailSent( 
      form_name: $form_name ,  
      form_email: $form_email, 
      form_location: $form_location, 
      form_eventType: $form_eventType, 
      form_role: $form_role, 
      form_hear: $form_hear, 
      form_date: $form_date, 
      form_eventLocation: $form_eventLocation, 
      form_budget: $form_budget, 
      form_message: $form_message,
    )
} `;