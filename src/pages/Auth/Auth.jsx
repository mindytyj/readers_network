import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function Auth({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <Outlet />;
}
