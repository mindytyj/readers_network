import { useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { useNavigate } from "react-router";

export default function Registration() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container border border-primary">
      <div className="m-3">
        <h2 className="text-center">Register</h2>
      </div>
      <div className="m-3">
        <RegistrationForm />
      </div>
      <div className="input-group mb-3 justify-content-md-center">
        <a href="/login" className="text-decoration-none">
          Already a member of Readers Network? Login here
        </a>
      </div>
    </div>
  );
}
