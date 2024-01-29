import { confirmEmail } from "@/api/sign-in";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";

function EmailConfirmed() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";

  const navigate = useNavigate();

  const { data: confirmUserEmail, isLoading } = useQuery({
    queryKey: ["confirmation", token],
    queryFn: () => confirmEmail(token),
  });

  const verifyUserEmail = async () => {
    console.log(token);
    await confirmUserEmail(JSON.stringify(token));
  };

  useEffect(() => {
    verifyUserEmail();
    navigate("/");
  }, [isLoading]);

  return (
    <div>
      <Helmet title="Email confirmado" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2lx font-semibold tracking-tight">
              Seu email foi confirmado, você vai ser redirecionado
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EmailConfirmed };
