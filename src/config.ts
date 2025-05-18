import { env } from '$env/dynamic/public';

const isLocal: boolean = env.PUBLIC_IS_LOCAL === "true";
const SERVER_URL = isLocal
  ? env.PUBLIC_LOCAL_SERVER
  : env.PUBLIC_PROD_SERVER;

export { SERVER_URL };
