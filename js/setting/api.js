import { getUserName } from "../utils/storage";
const name = getUserName();

const BASE_URL = "https://nf-api.onrender.com";
const REGISTER_URL = BASE_URL + "/api/v1/social/auth/register";
const LOGIN_URL = BASE_URL + "/api/v1/social/auth/login";
const CREATE_POST_URL = BASE_URL + "/api/v1/social/posts";
const GET_ALL_POST = BASE_URL + "/api/v1/social/posts";
const GET_POST_BY_ID = BASE_URL + "/api/v1/social/posts";
const USER_POSTS = BASE_URL + `/api/v1/social/profiles/${name}/posts?_author=true`;
const DELETE_USER_POST_ID = BASE_URL + "/api/v1/social/posts";
const EDIT_POST_ID = BASE_URL + "/api/v1/social/posts";

export {
  BASE_URL,
  REGISTER_URL,
  LOGIN_URL,
  CREATE_POST_URL,
  GET_ALL_POST,
  USER_POSTS,
  DELETE_USER_POST_ID,
  GET_POST_BY_ID,
  EDIT_POST_ID
};
