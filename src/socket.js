import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://api.hive.net.tr/"

export const socket = io(URL);