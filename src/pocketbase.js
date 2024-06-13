import Pocketbase from 'pocketbase';
import { SERVER_URL } from './serverselector';

const pb = new Pocketbase(SERVER_URL);

export default pb;