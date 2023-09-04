import { collection } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { collectionsKeys } from "../collectionsKeys";

export const reportCategoriesCollection = collection(db,collectionsKeys.reportCategories);