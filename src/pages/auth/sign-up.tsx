import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCompany } from "@/api/sign-up";

const signUpForm = z.object({
  companyName: z.string(),
  managerName: z.string(),
  managerEmail: z.string().email(),
  companyPhone: z.string(),
  password: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: createCompanyRequest } = useMutation({
    mutationFn: createCompany,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data);
      await createCompanyRequest(data);
      toast.success("Estabelecimento cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch (err) {
      toast.error("Erro ao cadastrar estabelecimento");
    }
  }
  return (
    <div>
      <Helmet title="Sign in" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="ghost">
          <Link to="/sign-in">Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2lx font-semibold tracking-tight">
              Criar sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e inicie sua jornada ao sucesso!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da empresa</Label>
              <Input
                {...register("companyName")}
                id="companyName"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                {...register("managerName")}
                id="managerName"
                type="managerName"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input {...register("managerEmail")} id="email" type="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input {...register("companyPhone")} id="phone" type="tel" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input {...register("password")} id="password" type="password" />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar Cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{" "}
              e{" "}
              <a href="" className="underline underline-offset-4">
                politicas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
