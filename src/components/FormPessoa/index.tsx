import React, { useState } from 'react';
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ISignupFormData } from "../../pages/SingUp";
import InputField from '../InputField';
import { AlignLeftIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, LockIcon, PhoneIcon, UserIcon } from '@phosphor-icons/react';

interface FormConhecimentoProps {
    register: UseFormRegister<ISignupFormData>
    errors: FieldErrors<ISignupFormData>
    mode?:"signup" | "login" 
}

const FormPessoa: React.FC<FormConhecimentoProps> = ({ register, errors, mode = "signup" }) => {

    const [showPass, setShowPass] = useState<boolean>(false);
    return (
        <div>
            {mode === "signup" && (
                <div>
                   <InputField
                        label="Nome"
                        icon={<UserIcon size={16} />}
                        type="text"
                        placeholder="Seu nome aqui"
                        register={register("nome")}
                        error={errors.nome?.message}
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
                    </div>
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
                
            )}
           

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
        </div>
    )
};

export default FormPessoa;