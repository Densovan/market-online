import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth, "refresh token");
  const refresh = async () => {
    const response = await axios.get("/api/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev), "pfdasf");
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
        role: response.data.role,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
