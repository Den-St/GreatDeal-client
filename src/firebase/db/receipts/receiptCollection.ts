import { collection } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { collectionsKeys } from "../collectionsKeys";

export const receiptCollection = collection(db,collectionsKeys.receipts);