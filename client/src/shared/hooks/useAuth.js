import { useSelector } from "react-redux";

export const useAuth = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin || false,
  };
};
