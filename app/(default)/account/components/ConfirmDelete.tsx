import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const ConfirmDelete = ({ setConfirmDelete }: any) => {
  const { user } = useGlobalContext();
  const userAuth = getAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ isError: false, message: "" });

  const provider = userAuth.currentUser?.providerData[0].providerId;

  const handleAccountDelete = () => {
    if (provider === "google.com") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(userAuth, provider)
        .then((result) => {
          userAuth.currentUser?.delete();
        })
        .catch((error) => {
          console.log({ error });
        });
    } else {
      const credential = EmailAuthProvider.credential(
        user.email as string, // user's email
        password
      );
      console.log(credential);
      signInWithEmailAndPassword(userAuth, user.email, password)
        .then(() => {
          userAuth.currentUser?.delete();
        })
        .catch((error) => {
          console.log(error);
          setError({
            isError: true,
            message: error.message
              .replace("Firebase:", "")
              .replace("auth/", "")
              .trim(),
          });
        });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8" data-aos="fade-up">
      <p className="max-w-2xl text-center">
        Deleting your account will also cancel any active QuickWires Pro
        subscription. If you wish to cancel and use the rest of your
        subscription, go back to manage subscription.
      </p>
      <p className="max-w-2xl text-center">
        Are you sure you want to delete your account?
      </p>
      {provider === "password" ? (
        <div className="">
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input w-full text-gray-300"
            // placeholder="Password (at least 10 characters)"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ isError: false, message: "" });
            }}
          />
        </div>
      ) : null}

      {error.isError ? (
        <div className="flex flex-wrap -mx-3 mb-4">
          <p className="text-medium text-red-600 px-3">{error.message}</p>
        </div>
      ) : null}

      <button
        className="btn 
    border-red-600 text-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700"
        onClick={handleAccountDelete}
      >
        Yes, Delete Account
      </button>
      <button
        className="btn 
  bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 text-white"
        onClick={() => setConfirmDelete(false)}
      >
        No, Keep QuickWires
      </button>
    </div>
  );
};

export default ConfirmDelete;
