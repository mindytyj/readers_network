import { useEffect } from "react";
import LoginForm from "./LoginForm";
import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { useNavigate } from "react-router";

export default function Login() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container border border-primary rounded mt-4 mb-3">
      <div className="m-3">
        <h2 className="text-center">Login</h2>
      </div>
      <div className="m-3">
        <LoginForm />
      </div>
      <div className="input-group mb-3 justify-content-md-center">
        <a href="/register" className="text-decoration-none">
          Not a member of Readers Network? Register here
        </a>
      </div>
    </div>
  );
}
