import { getUserName } from "../utils/storage";

const userName = getUserName()

const BASE_URL = "https://nf-api.onrender.com";
const REGISTER_URL = BASE_URL +  "/api/v1/social/auth/register";
const LOGIN_URL = BASE_URL + "/api/v1/social/auth/login";
const CREATE_POST_URL = BASE_URL + "/api/v1/social/posts";
const GET_ALL_POST = BASE_URL + "/api/v1/social/posts";
const GET_USER_POST_URL = BASE_URL +`api/v1/social/posts/${userName}?_author=true`;

export {BASE_URL,REGISTER_URL,LOGIN_URL,CREATE_POST_URL,GET_ALL_POST,GET_USER_POST_URL}