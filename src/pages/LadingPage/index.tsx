import Header from "../../components/Header";
import CardGrid from "../../components/CardGrid";

import React from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
interface StatItem {
    num: string;
    label: string;
}

export const LandingPage: React.FC = () => {

    const navigate = useNavigate();
    const STATS: StatItem[] = [
        { num: "2.4k", label: "Especialistas ativos" },
        { num: "180+", label: "Áreas de conhecimento" },
        { num: "98%", label: "Satisfação" },
    ];
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Header />

            <section className="flex items-center gap-16 px-16 pt-20 pb-16 max-w-screen-xl mx-auto">

                <div className="flex-1">
                    <h1 className="font-serif text-[58px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-5">
                        Aprenda e ensine
                        <br />
                        o que você{" "}
                        <span className="relative text-blue-600 inline-block">
                            domina
                        </span>
                    </h1>

                    <p className="text-[17px] text-gray-500 leading-relaxed mb-9 max-w-[440px]">
                        Conecte-se com pessoas que querem aprender o que você sabe. Troque
                        conhecimento, cresça junto e construa uma rede de aprendizado real.
                    </p>

                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 text-[15px] font-semibold text-white bg-blue-600 px-7 py-3.5 rounded-xl  cursor-pointer hover:bg-blue-700 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-200 transition-all" onClick={() => navigate("/singup")} >
                            Cadastre-se grátis <ArrowRightIcon size={17} weight="bold" />
                        </button>
                    </div>

                    <div className="flex gap-8 mt-12 pt-8 border-t border-gray-100">
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <p className="font-serif text-[28px] font-bold text-blue-700">{s.num}</p>
                                <p className="text-[13px] text-gray-400 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CardGrid />
        </div>
    )
};

export default LandingPage;