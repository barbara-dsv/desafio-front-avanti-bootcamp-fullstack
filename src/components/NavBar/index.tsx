import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {

    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-16 py-5 bg-white/95 backdrop-blur-md border-b border-blue-100">
            <span className="font-serif text-xl font-bold text-blue-700 tracking-tight">
                Know<span className="text-blue-400">Hub</span>
            </span>

            <div className="flex items-center gap-3">
                <button className="text-sm font-medium text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                    Entrar
                </button>
                <button className="text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-xl cursor-pointer hover:bg-blue-700 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-200 transition-all"
                    onClick={() => navigate("/singup")}>
                    Cadastre-se
                </button>
            </div>
        </nav>
    )
};

export default Navbar; 