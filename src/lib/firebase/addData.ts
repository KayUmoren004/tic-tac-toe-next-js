import firebase from "./config";
import {
  getFirestore,
  doc,
  setDoc,
  Firestore,
  DocumentReference,
  SetOptions,
} from "firebase/firestore";

const db = getFirestore(firebase);
interface AddDataResult {
  result: any;
  error: any;
}

interface Data {
  [key: string]: any;
}

export default async function addData(
  collection: string,
  id: string,
  data: Data
): Promise<AddDataResult> {
  let result: any = null;
  let error: any = null;

  try {
    const db: Firestore = getFirestore(firebase);
    const docRef: DocumentReference = doc(db, collection, id);
    const options: SetOptions = {
      merge: true,
    };
    result = await setDoc(docRef, data, options);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
}
