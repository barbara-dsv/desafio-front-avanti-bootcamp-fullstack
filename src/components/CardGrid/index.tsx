import api from '../../services/api'
import { useEffect, useState } from "react";
import type { IInputValues } from '../../interfaces/ConhecimentoInterface'

const CardGrid: React.FC = () => {
    const [conhecimentos, setConhecimentos] = useState<IInputValues[]>([]);

    useEffect(() => {
        const fetchConhecimentos = async () => {
            try {
                const response = await api.get('/skill?limit=8');
                const data: IInputValues[] = response.data.data;
                setConhecimentos(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchConhecimentos()
    }, [])
    return (
        <section className="px-16 pb-20 max-w-screen-xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-5">
                Conhecimentos em destaque
            </p>
            <div className="grid grid-cols-4 gap-4">
                {conhecimentos.map((c) => (
                    <div
                        key={c.id}
                        className="relative bg-white border-[1.5px] border-blue-100 rounded-2xl p-5 cursor-pointer overflow-hidden transition-all hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-blue-500"
                        />

                        <p className="mt-3 text-sm font-bold text-gray-900">{c.titulo}</p>
                        <p className="text-xs text-gray-400 mt-0.5 mb-4">{c.descricao}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                {c.nivel}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default CardGrid;