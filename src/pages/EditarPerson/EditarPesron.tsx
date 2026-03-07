import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import type { Person } from "../../interfaces/UsuariosIterface";
import type { IInputValues } from "../../interfaces/ConhecimentoInterface";

const EditarPerson: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const personFromState = location.state?.person;

  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Buscar os dados do usuário
  useEffect(() => {
    if (personFromState) {
      setPerson(personFromState);
      setNome(personFromState.nome);
      setEmail(personFromState.email);

      setIsLoading(false);
      return;
    }

    const fetchPerson = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Você precisa estar logado!");
          navigate("/login");
          return;
        }
        const response = await api.get(`/person/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerson(response.data);
        setNome(response.data.nome || "");
        setEmail(response.data.email || "");
      } catch (error: any) {
        console.log("Erro ao buscar:", error.response || error);
        alert("Aviso: Dados não encontrados");
        navigate("/listarusuarios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id, navigate, personFromState]);

  // Função para salvar alterações
  const salvarUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado!");
        navigate("/login");
        return;
      }

      await api.put(
        `/person/${id}`,
        { nome, email },
        { headers: { Authorization: token } }
      );

      alert("Usuário atualizado com sucesso!");
      navigate("/listarusuarios");
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar usuário");
    }
  };

  if (isLoading) return <p className="text-center mt-8">Carregando...</p>;

  if (!person)
    return (
      <p className="text-center mt-8 text-red-600">
        Usuário não encontrado!
      </p>
    );

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="relative bg-white border-[1.5px] border-blue-100 rounded-2xl p-8 overflow-hidden max-w-md w-full">

        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-blue-500" />

        <h1 className="font-serif text-2xl font-bold text-blue-700 mb-4 text-center">
          Editar Usuário
        </h1>

        <div className="flex flex-col gap-4">
          <label htmlFor="nome" className="text-sm font-semibold text-gray-700">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <p className="text-sm font-semibold text-gray-700 mt-3">
            Conhecimentos
          </p>
          <div className="flex flex-wrap gap-2">
            {person.conhecimentos?.map((c: IInputValues) => (
              <span
                key={c.id}
                className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
              >
                {c.titulo}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={salvarUsuario}
              className="w-full text-center text-white bg-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-700 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-200 transition-all"
            >
              Salvar
            </button>

            <button
              onClick={() => navigate("/listarusuarios")}
              className="w-full text-center text-gray-700 bg-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-300 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerson;