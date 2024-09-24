import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/utils/axios";
import {
  signInWithGooglePopup,
  signInWithGithubPopup,
  db,
} from "../../utils/firebase.utils";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { reset as resetProject } from "../project/projectSlice";

import { toast } from "react-toastify";
import { RootState } from "..";

interface UserState {
  email: string;
  authToken: string;
  inSession?: boolean;
  
}

const initialState: UserState = {
  email: "",
  authToken: "" as string,
  inSession: false as boolean,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setUserState: (state, action: PayloadAction<UserState>) => {
      const { email, authToken } = action.payload;
      state.email = email;
      state.authToken = authToken;
      state.inSession = true;
    },
    setUserSession: (state, action: PayloadAction<boolean>) => {
      state.inSession = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const loginGoogleUser = createAsyncThunk(
  "auth/loginGoogleUser",
  async (_, { getState, dispatch }) => {
    try {
      const response = await signInWithGooglePopup();

      const login = await bonadocsLogin(response);

      if (!login) {
        return false;
      }
      dispatch(setUserState(login));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);

export const loginGithubUser = createAsyncThunk(
  "auth/loginGithubUser",
  async (_, { getState, dispatch }) => {
    try {
      const response = await signInWithGithubPopup();
      const login = await bonadocsLogin(response);

      if (!login) {
        return false;
      }
      dispatch(setUserState(login));
      return true;
    } catch (err) {
      console.log("login github user err", err);
      return false;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, getState }) => {
    dispatch(reset());
    dispatch(resetProject());
    dispatch(setUserSession(false));
  }
);

const bonadocsLogin = async (userInfo: any) => {
  const { localId, firstName, lastName, email, idToken } =
    userInfo._tokenResponse;

  const encodedAuthData = {
    userId: localId,
    idToken: idToken,
  };
  let response;

  try {
    const getAccountExists = await getDocs(collection(db, "users")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs[0]
          .data()
          .email.find((emailAddress: string) => emailAddress === email);

        if (newData) {
          return true;
        } else {
          return false;
        }
      }
    );

    if (getAccountExists) {
      response = await api.post(`/login`, {
        authSource: "firebase",
        encodedAuthData: window.btoa(JSON.stringify(encodedAuthData)),
      });
    } else {
      response = await api.post(`/register`, {
        firstName,
        lastName: lastName ?? "bonadocs",
        username: email,
        emailAddress: email,
        authSource: "firebase",
        encodedAuthData: window.btoa(JSON.stringify(encodedAuthData)),
      });
      const usersRef = doc(db, "users", "email");

      await updateDoc(usersRef, {
        email: arrayUnion(email),
      });
    }

    
    return {
      email: email,
      authToken: response.data.data.token,
    };
  } catch (err: any) {
    toast.error(err.response);
    console.log("bonadocs login err", err);

    return false;
  }
};

export const { setUserState, setUserSession, reset } = authSlice.actions;
export default authSlice.reducer;
