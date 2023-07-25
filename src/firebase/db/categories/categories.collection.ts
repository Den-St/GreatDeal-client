import { collectionsKeys } from './../collectionsKeys';
import { db } from './../../firebaseInit';
import { collection } from "firebase/firestore";

export const categoriesCollection = collection(db,collectionsKeys.categories);