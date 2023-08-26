import { collection } from 'firebase/firestore';
import { db } from '../../firebaseInit';
import { collectionsKeys } from '../collectionsKeys';

export const chatRoomsCollection = collection(db,collectionsKeys.chatRooms);