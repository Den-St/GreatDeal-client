import { db } from './../../../firebaseInit';
import { collection } from "firebase/firestore";
import { collectionsKeys } from "../../collectionsKeys";


export const messageCollection = collection(db,collectionsKeys.messages);