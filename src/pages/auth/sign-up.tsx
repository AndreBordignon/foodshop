import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCompany } from "@/api/sign-up";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const signUpForm = z.object({
  name: z.string(),
  managerName: z.string(),
  managerEmail: z.string().email(),
  phone: z.string(),
  password: z.string(),
  file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: createCompanyRequest } = useMutation({
    mutationFn: createCompany,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("managerEmail", data.managerEmail);
      formData.append("managerName", data.managerName);
      formData.append("password", data.password);
      await createCompanyRequest(formData);
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
              <Label htmlFor="file">Picture</Label>
              <Controller
                control={control}
                name="file"
                rules={{ required: "Recipe picture is required" }}
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <Input
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    type="file"
                    id="picture"
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files && files.length > 0) {
                        console.log(files);
                        // Atualiza o valor do campo de arquivo no React Hook Form
                        onChange(files[0]);
                      }
                    }}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome da empresa</Label>
              <Input {...register("name")} id="name" type="text" />
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
              <Input {...register("phone")} id="phone" type="tel" />
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
