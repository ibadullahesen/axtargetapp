import Login from "@/components/Login";
import Feed from "@/components/Feed";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Feed /> : <Login />;
}
