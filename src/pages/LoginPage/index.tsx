import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRightIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockIcon } from "@phosphor-icons/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../../components/InputField";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";





const schema = yup.object({
    email: yup.string().email("Email inválido").required("Este campo deve ser preenchido"),
    senha: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Este campo deve ser preenchido"),
}).required();



export type ISignupFormData = yup.InferType<typeof schema>;

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)!;

    const [showPass, setShowPass] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISignupFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (input: ISignupFormData) => {

        try {
            const { data } = await api.post("/login", {
                email: input.email,
                senha: input.senha
            });
            console.log(data);
            if (data?.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.person.id);
                login(data.token);

            }
            alert("Login realizado com sucesso!")
            navigate("/listarusuarios")
            reset();
            



        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-10 relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

            <div className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full bg-blue-600/5 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-400/8 pointer-events-none" />

            <div className="relative z-10 w-full max-w-[860px] bg-white rounded-[28px] shadow-[0_24px_80px_rgba(37,99,235,0.12)] border border-blue-100 px-12 py-11">


                <div className="mb-9">
                    <span className="font-serif text-xl font-bold text-blue-700">
                        Know<span className="text-blue-400">Hub</span>
                    </span>
                    <h2 className="font-serif text-[30px] font-bold text-gray-900 tracking-tight mt-5 mb-1.5">
                        Login
                    </h2>

                </div>


                <div className="grid grid-cols-[1.2fr_1px_1fr] gap-x-10">
                    <div>
                        <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>

                            <InputField
                                label="E-mail"
                                icon={<EnvelopeIcon size={16} />}
                                type="email"
                                placeholder="seu@email.com"
                                register={register("email")}
                                error={errors.email?.message}
                            />

                            <InputField
                                label="Senha"
                                icon={<LockIcon size={16} />}
                                type={showPass ? "text" : "password"}
                                placeholder="Mínimo 8 caracteres"
                                register={register("senha")}
                                error={errors.senha?.message}
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowPass((v) => !v)}
                                    className="text-gray-400 hover:text-blue-500 transition-colors"
                                >
                                    {showPass ? <EyeIcon size={16} /> : <EyeSlashIcon size={16} />}
                                </button>
                            </InputField>

                        </form>
                    </div>

                </div>

                <div className="flex items-center justify-between mt-9 pt-7 border-t border-blue-100">
                    <p className="text-[13px] text-gray-400">
                        Não tem conta?{" "}
                        <button className="text-blue-600 font-semibold hover:underline bg-none border-none 
                        cursor-pointer"onClick={() => navigate("/singup")}>
                            Criar conta
                        </button>
                    </p>
                    <button
                        type="submit"
                        form="signup-form"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer px-7 py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:-translate-y-px hover:shadow-xl hover:shadow-blue-300 transition-all">
                        Entrar<ArrowRightIcon size={16} weight="bold"  
                        onClick={() => navigate("/listarusuarios")}/>
                    </button>
                </div>
            </div>
        </div >
    );
};


export default LoginPage;