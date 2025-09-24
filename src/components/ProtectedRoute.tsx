import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading: loading } = useUser();
  console.log(user);
  const navigate = useNavigate();

  console.log(user);

  useEffect(
    function () {
      if (!loading && !user) {
        navigate("/login", { replace: true });
      }
    },
    [loading, user, navigate],
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl dark:text-white">Loading Application...</p>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return null;
}

export default ProtectedRoute;
