import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "@/api/sign-in";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  const navigate = useNavigate();
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });
  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authenticate({
        username: data.email,
        password: data.password,
      });
      if (response.data.status === "ok") {
        navigate("/");
        return;
      }
      toast.success("Voce vai receber um email", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    } catch (err) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div>
      <Helmet title="Sign in" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-up">Novo parceiro</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2lx font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe sua empresa pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Digite seu e-mail</Label>
              <Input {...register("email")} id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Digite sua senha</Label>
              <Input {...register("password")} id="password" type="password" />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
