import React, { useState } from "react";
import {
    UserIcon,
    EnvelopeIcon,
    LockIcon,
    EyeIcon,
    EyeSlashIcon,
    AlignLeftIcon,
    TagChevronIcon,
    GraduationCapIcon,
    ArrowRightIcon,
    LightbulbFilamentIcon,
    CaretDownIcon,
    PhoneIcon,
    SubtitlesIcon
} from "@phosphor-icons/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import type { UseFormRegisterReturn } from "react-hook-form";

type Level = "" | "Iniciante" | "Intermediário" | "Avançado";


const LEVELS: { value: Level; label: string; emoji: string }[] = [
    { value: "Iniciante", label: "Iniciante", emoji: "🌱" },
    { value: "Intermediário", label: "Intermediário", emoji: "⚡" },
    { value: "Avançado", label: "Avançado", emoji: "🚀" },
];


interface InputFieldProps {
    label: string;
    icon: React.ReactNode;
    type?: string;
    placeholder: string;
    children?: React.ReactNode;
    register?: UseFormRegisterReturn;
    error?: string;
}
//Componente Funcional para os campos de input
const InputField: React.FC<InputFieldProps> = ({
    label,
    icon,
    type = "text",
    placeholder,
    children,
    register,
    error
}) => (
    <div className="mb-4">
        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
            {label}
        </label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </span>
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full pl-10 pr-10 py-2.5 text-sm font-normal text-gray-900 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-300 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)] ${error ? 'border-red-400' : 'border-gray-200'}`}
                {...register}
            />
            {children && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {children}
                </span>
            )}
        </div>
    </div>
);
//Componente funcional para os títulos das seções
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-[11px] font-bold uppercase tracking-widest text-blue-500 mb-5 pb-2.5 border-b-[1.5px] border-blue-100">
        {children}
    </p>
);

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
    const [showPass, setShowPass] = useState<boolean>(false);

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

            const token = resLogin.data.token;
            localStorage.setItem("token", token);

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
            reset()

            alert("Cadastro realizado com sucesso!")

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
                            <InputField
                                label="Nome"
                                icon={<UserIcon size={16} />}
                                type="text"
                                placeholder="Seu nome aqui"
                                register={register("nome")}
                                error={errors.nome?.message}
                            />

                            <InputField
                                label="E-mail"
                                icon={<EnvelopeIcon size={16} />}
                                type="email"
                                placeholder="seu@email.com"
                                register={register("email")}
                                error={errors.email?.message}
                            />

                            <InputField
                                label="Telefone"
                                icon={<PhoneIcon size={16} />}
                                type="tel"
                                placeholder="(00) 00000-0000"
                                register={register("telefone")}
                                error={errors.telefone?.message}
                            />

                            <div className="mb-4">
                                <label htmlFor="descricao_pessoa" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Descrição
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        <AlignLeftIcon size={16} />
                                    </span>
                                    <textarea
                                        id="descricao_pessoa"
                                        placeholder="Conte um pouco sobre você, sua experiência e o que gosta de aprender..."
                                        rows={4}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl outline-none resize-none transition-all placeholder:text-gray-300 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
                                        {...register("descricao_pessoa")}
                                    />
                                </div>
                            </div>

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

                    <div className="bg-blue-100 mx-auto w-px self-stretch" />

                    <div>
                        <SectionTitle>Ofertar Conhecimento</SectionTitle>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="titulo" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Título
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <SubtitlesIcon size={16} />
                                    </span>
                                    <input
                                        id="titulo"
                                        type="text"
                                        placeholder="Ex: Lógica de Programação, Photoshop..."
                                        className={`w-full pl-10 pr-1 py-2.5 text-sm text-gray-900 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-300 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)] ${errors.titulo ? 'border-red-400' : 'border-gray-200'}`}
                                        {...register("titulo")}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="descricao_conhecimento" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Descrição
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        <AlignLeftIcon size={16} />
                                    </span>
                                    <textarea
                                        id="descricao_conhecimento"
                                        placeholder="Fale mais sobre o que você oferece, sua experiência e o que os outros podem aprender com você..."
                                        rows={4}
                                        className={`w-full pl-10 pr-1 py-2.5 text-sm text-gray-900 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-300 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)] ${errors.descricao_conhecimento ? 'border-red-400' : 'border-gray-200'}`}
                                        {...register("descricao_conhecimento")}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categoria" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Categoria
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <TagChevronIcon size={16} />
                                    </span>
                                    <input
                                        id="categoria"
                                        type="text"
                                        placeholder="Ex: Programação, Design, Idiomas..."
                                        className={`w-full pl-10 pr-1 py-2.5 text-sm text-gray-900 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-300 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)] ${errors.categoria ? 'border-red-400' : 'border-gray-200'}`}
                                        {...register("categoria")}
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="nivel" className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                                    Nível
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <GraduationCapIcon size={16} />
                                    </span>
                                    <select
                                        id="nivel"
                                        className={`w-full pl-10 pr-1 py-2.5 text-sm text-gray-900 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl outline-none transition-all placeholder:text-gray-300 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)] ${errors.nivel ? 'border-red-400' : 'border-gray-200'}`}
                                        {...register("nivel")}
                                    >
                                        <option value="" disabled>
                                            Selecione o nível
                                        </option>
                                        {LEVELS.map(({ value, label, emoji }) => (
                                            <option key={value} value={value}>
                                                {emoji} {label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <CaretDownIcon size={14} />
                                    </span>
                                </div>
                            </div>
                        </form>


                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <p className="flex items-center gap-2 text-[13px] font-bold text-blue-700 mb-2">
                                <LightbulbFilamentIcon size={15} weight="fill" className="text-blue-400" />
                                Como funciona
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Ao ofertar seu conhecimento, outras pessoas poderão te encontrar
                                e solicitar sessões de troca. Você define sua disponibilidade!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-9 pt-7 border-t border-blue-100">
                    <p className="text-[13px] text-gray-400">
                        Já tem conta?{" "}
                        <button className="text-blue-600 font-semibold hover:underline bg-none border-none cursor-pointer">
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