import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="container">
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
