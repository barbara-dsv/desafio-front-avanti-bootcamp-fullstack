import React, { useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import SectionTitle from "../../components/SectionTitle";
import FormConhecimento from "../../components/FormConhecimento";
import FormPessoa from "../../components/FormPessoa";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";



const schema = yup.object({
    //Campos de cadastro de pessoa
    nome: yup.string().required("Este campo deve ser preenchido"),
    email: yup.string().email("Email inválido").required("Este campo deve ser preenchido"),
    telefone: yup.string().required("Este campo deve ser preenchido"),
    descricao_pessoa: yup.string().required("Este campo deve ser preenchido"),
    senha: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Este campo deve ser preenchido"),
    //Campos de cadastro de conhecimento
    titulo: yup.string().required("Este campo deve ser preenchido"),
    descricao_conhecimento: yup.string().required("Este campo deve ser preenchido"),
    categoria: yup.string().required("Este campo deve ser preenchido"),
    nivel: yup.string().oneOf(["Iniciante", "Intermediário", "Avançado"], "Selecione um nível válido").required("Este campo deve ser preenchido"),
}).required();

export type ISignupFormData = yup.InferType<typeof schema>;

export const SignupPage: React.FC = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISignupFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ISignupFormData) => {
        try {
            const responsePessoa = await api.post("/person", {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                descricao: data.descricao_pessoa,
                senha: data.senha
            })
            console.log(responsePessoa)
            const novoPessoaId = responsePessoa.data.id;

            const resLogin = await api.post("/login", {
                email: data.email,
                senha: data.senha
            });

            localStorage.clear();

            const token = resLogin.data.token;
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("id", resLogin.data.person.id);
            }
            const responseConhecimento = await api.post("/skill", {
                titulo: data.titulo,
                descricao: data.descricao_conhecimento,
                categoria: data.categoria,
                nivel: data.nivel,
                pessoa_id: novoPessoaId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log(responseConhecimento)
            navigate("/listarusuarios")
            reset()

        } catch (error: any) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status === 400) {
                    setErrorMessage("Email já cadastrado ou dados inválidos.");
                } else {
                    setErrorMessage("Ocorreu um erro. Tente novamente.");
                }
            } else {
                setErrorMessage("Erro desconhecido.");
            }
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
                        Crie sua conta
                    </h2>
                    <p className="text-sm text-gray-400">
                        Preencha seus dados e comece a trocar conhecimento hoje mesmo.
                    </p>
                </div>


                <div className="grid grid-cols-[1.2fr_1px_1fr] gap-x-10">
                    <div>
                        <SectionTitle>Cadastro de Pessoa</SectionTitle>
                        <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
                            <FormPessoa register={register} errors={errors} />
                        </form>
                        {errorMessage && (
                            <p className="text-red-500 text-sm font-medium mt-2 ">
                                {errorMessage}
                            </p>
                        )}
                    </div>

                    <div className="bg-blue-100 mx-auto w-px self-stretch" />

                    <div>
                        <SectionTitle>Ofertar Conhecimento</SectionTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormConhecimento register={register} errors={errors} />
                        </form>
                    </div>

                </div>

                <div className="flex items-center justify-between mt-9 pt-7 border-t border-blue-100">
                    <p className="text-[13px] text-gray-400">
                        Já tem conta?{" "}
                        <button className="text-blue-600 font-semibold hover:underline bg-none border-none cursor-pointer" onClick={() => navigate("/login")}>
                            Entrar
                        </button>
                    </p>
                    <button
                        type="submit"
                        form="signup-form"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer px-7 py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:-translate-y-px hover:shadow-xl hover:shadow-blue-300 transition-all"
                    >
                        Finalizar Cadastro <ArrowRightIcon size={16} weight="bold" />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default SignupPage;