import { DocumentData, QuerySnapshot } from "firebase/firestore"

export const getFilteredQuery = (data:QuerySnapshot<DocumentData, DocumentData>) => {
    return data.docs.map((doc) => ({...doc.data(),id: doc.id}));
}