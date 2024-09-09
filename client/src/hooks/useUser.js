// useUser.js
import { useContext } from "react";
import UserContext from "../components/UserProvider"; // Import the context from UserProvider

export const useUser = () => {
  return useContext(UserContext); // Use the context here
};
