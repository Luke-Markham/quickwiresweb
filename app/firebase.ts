import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { isPastCurrentDate, quickWireGoProOnSignUp } from "./helpers/helpers";

export const firebaseConfig = {
  apiKey: "AIzaSyAeJY-iI55-80DOA7Vce6U9riggIVd_XSQ",
  authDomain: "quickwires-fe2ea.firebaseapp.com",
  projectId: "quickwires-fe2ea",
  storageBucket: "quickwires-fe2ea.appspot.com",
  messagingSenderId: "413729346085",
  appId: "1:413729346085:web:4146302d39b60da42ba5cc",
  measurementId: "G-4RFHHPQY4H",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handleGoogleSignUp = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((authResult) => {
      // const credential = GoogleAuthProvider.credentialFromResult(authResult);
      // const token = credential?.accessToken;
      const user = authResult.user;
      const result = quickWireGoProOnSignUp();
      if (result?.goPro) {
        checkout(user.uid, result.timing);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ error });
    });
};

export const getUser = async (authedUser: {
  name: string;
  email: string;
  photoUrl: string | null;
  uid: string;
}) => {
  try {
    const userDoc = doc(db, "users", authedUser.uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const user = userSnapshot.data();
      if (user.pro && user.subscriptionEndDate) {
        const expiredPro = isPastCurrentDate(user.subscriptionEndDate);
        if (expiredPro) {
          await updateDoc(doc(db, "users", authedUser.uid), {
            pro: false,
            subscriptionEndDate: null,
          });
          return { ...user, pro: false, subscriptionEndDate: null };
        }
      }
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async (userToCreate: {
  name: string;
  email: string;
  uid: string;
  photoUrl: string | null;
}) => {
  try {
    const userRef = doc(db, "users", userToCreate.uid);
    await setDoc(userRef, {
      ...userToCreate,
      pro: false,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkout = async (userId: string, timing: string) => {
  let priceId: string | null = null;

  // Query Firestore for active plans
  const planQuery = query(collection(db, "plans"), where("active", "==", true));
  const querySnapshot = await getDocs(planQuery);

  for (const doc of querySnapshot.docs) {
    // Query Firestore for prices with the specified interval (timing)
    const priceQuery = query(
      collection(doc.ref, "prices"),
      where("interval", "==", timing)
    );

    const priceSnap = await getDocs(priceQuery);

    if (!priceSnap.empty) {
      priceId = priceSnap.docs[0].id;
      break;
    }
  }

  if (priceId) {
    const checkoutSessionsCollection = collection(
      db,
      "stripeCustomers",
      userId,
      "checkout_sessions"
    );
    const docRef = await addDoc(checkoutSessionsCollection, {
      price: priceId,
      success_url: window.location.origin + "/account",
      cancel_url: window.location.origin + "/pricing",
      metadata: {
        userId,
      },
    });

    // Listen for changes on the Firestore document
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data();

      if (data) {
        const { error, url } = data;

        if (error) {
          alert(`An error occurred: ${error.message}`);
        }

        if (url) {
          window.location.assign(url);
        }
      }
    });

    // Call this function when you want to unsubscribe
    // unsubscribe();
  } else {
    console.log("No active plans found for the specified interval.");
  }
};

export const openStripePortal = async () => {
  const functions = getFunctions(app, "us-central1");
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  try {
    const { data }: any = await functionRef({
      returnUrl: window.location.origin + "/account",
      locale: "auto", // Optional, defaults to "auto"
      // configuration: "bpc_1JSEAKHYgolSBA358VNoc2Hs", // Optional ID of a portal configuration
    });

    // Open the Stripe portal in a new window
    // window.open(data.url);
    window.location.assign(data.url);
  } catch (error) {
    console.error("Error opening Stripe portal:", error);
  }
};
