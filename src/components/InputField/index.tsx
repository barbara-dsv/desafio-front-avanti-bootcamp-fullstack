import type { UseFormRegisterReturn } from "react-hook-form";

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

export default InputField;