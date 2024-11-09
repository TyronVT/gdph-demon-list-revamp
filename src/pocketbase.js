import Pocketbase from 'pocketbase';
import { SERVER_URL } from './config';

const pb = new Pocketbase(SERVER_URL);

export default pb;