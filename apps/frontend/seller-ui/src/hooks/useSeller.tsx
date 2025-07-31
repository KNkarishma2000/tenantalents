import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance"; // make sure it's the default export

const fetchUser = async () => {
  const response = await axiosInstance.get("/api/logged-in-user");
  return response.data.user; // ✅ properly return the user
};

const useSeller = () => {
  return useQuery({
    queryKey: ["loggedInUser"],
    queryFn: fetchUser,
  });
};

export default useSeller;
