import RegisterExpert from "@/components/Register/RegisterExpert";
import RegisterUser from "@/components/Register/RegisterUser";
import { useRouter } from "next/navigation";
const register = () => {
  const router = useRouter();
  const { query } = router;

  const userType = query.type;
  return (
    <div>{userType === "expert" ? <RegisterExpert /> : <RegisterUser />}</div>
  );
};

export default register;
