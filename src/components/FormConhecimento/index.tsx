import {
    AlignLeftIcon,
    TagChevronIcon,
    GraduationCapIcon,
    LightbulbFilamentIcon,
    CaretDownIcon,
    SubtitlesIcon
} from "@phosphor-icons/react";
import React from 'react';
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ISignupFormData } from "../../pages/SingUp";

interface FormConhecimentoProps {
    register: UseFormRegister<ISignupFormData>
    errors: FieldErrors<ISignupFormData>
}

type Level = "" | "Iniciante" | "Intermediário" | "Avançado";


const LEVELS: { value: Level; label: string; emoji: string }[] = [
    { value: "Iniciante", label: "Iniciante", emoji: "🌱" },
    { value: "Intermediário", label: "Intermediário", emoji: "⚡" },
    { value: "Avançado", label: "Avançado", emoji: "🚀" },
];
const FormConhecimento: React.FC<FormConhecimentoProps> = ({ register, errors }) => {
    return (
        <div>
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
    )

}

export default FormConhecimento;



