import Login from "@/component/login/Login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
      router.push("/feeds");
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <>
      {!isAuthenticated ? <Login /> : null}
    </>
  );
}
