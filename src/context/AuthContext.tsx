import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { auth } from "@/utils/firebase.utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { reset } from "@/store/auth/authSlice";
import { resetTeam } from "@/store/team/teamSlice";
// Create the context props
interface AuthContextProps {
  user: any;
  checkUserStatus: () => void;
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a custom hook to consume the context
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}
// Create the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [queryParameters] = useSearchParams();
  const [loading, setLoading] = useState<boolean>();
  const uri = queryParameters.get("uri");
  const dispatch: AppDispatch = useDispatch();
  const checkUserStatus = () => {
    auth.onAuthStateChanged((user: any) => {
      setLoading(true);
      if (user) {
    
      
        setUser(user);
        // navigate({
        //   pathname: "/contracts",
        //   search: `?uri=${uri}`,
        // });
        setLoading(false);
      } else {
        //  toast.error("No user found");
        setLoading(false);
        // navigate({
        //   pathname: "/login",
        //   search: `?uri=${uri}`,
        // });
      }
    });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        dispatch(reset());
        dispatch(resetTeam());
        navigate({
          pathname: "/login",
          search: `?uri=${uri}`,
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: user,
        checkUserStatus: checkUserStatus,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
