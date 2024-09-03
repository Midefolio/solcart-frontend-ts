import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import UserDasNav from "../dashboard_components/user_dasNav";
import PostItem from "./post_item";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useUtils from "../../../utils/useutils";
import useApi from "../../../hook/useApi";
import useUtilsContext from "../../../hook/useUtilsContext";
import { useEffect } from "react";
import MyItems from "./my_items";

const DashMain = () => {
  const { active } = useParams();
  const [searchParams] = useSearchParams();
  const query: any = searchParams.get("p");
  const navigate = useNavigate();
  const { setCurrentUser, user } = useUserAuthContext();
  const { BASE_URL } = useUtilsContext();
  const { isSending } = useUtils();
  const { makeRequest } = useApi();
  const validActives = [
    "main",
    "call-requests",
    "messages",
    "orders",
    "Items",
    "market-place",
  ];
  const validQueries = [
    "items-for-sale",
    "my-orders",
    "my-customers-order",
    "saved-items",
    "post-item",
  ];
  const user_api = BASE_URL + "userAuth/get-current-user";
  const email = localStorage.getItem("solCart-email");

  // Check if the active or query is invalid
  const isActiveValid = active && validActives.includes(active);
  const isQueryValid = !query || validQueries.includes(query);

  if (!isActiveValid || !isQueryValid) {
    return (
      <div>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <button onClick={() => navigate("/profile/main")}>Go to Profile</button>
      </div>
    );
  }

  const getCurrentUser = async () => {
    const cb = () => {
      isSending(false);
    };
    const res = await makeRequest("POST", user_api, { email }, cb, user);
    if (res) {
      setCurrentUser(res?.data);
      isSending(false);
    }
  };

  useEffect(() => {
    if (user) {
      getCurrentUser();
    }
  }, [user]);

  return (
    <>
      <UserDasNav />
      {active === "Items" && query === "items-for-sale" && <MyItems/>}
      {active === "Items" && query === "post-item" && <PostItem />}
    </>
  );
};

export default DashMain;
