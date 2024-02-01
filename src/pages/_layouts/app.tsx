import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { useLayoutEffect } from "react";
import { AxiosResponse, isAxiosError } from "axios";
import { api } from "@/lib/axios";

export function AppLayout() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: { response: { status: any; data: { code: any } } }) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.message;

          if (status === 401 && code === "Unauthorized") {
            navigate("/sign-in", {
              replace: true,
            });
          }
        }

        return Promise.reject(error);
      },
    );

    // Clean up the side effect when the component unmounts
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="flex flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
