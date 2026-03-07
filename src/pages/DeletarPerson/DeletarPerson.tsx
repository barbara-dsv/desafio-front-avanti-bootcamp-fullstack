import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function DeletarPerson() {

  const navigate = useNavigate();
  const { id } = useParams();

  async function deletarUsuario() {
    try {

      const token = localStorage.getItem("token");

      await api.delete(`/person/${id}`, {
        headers: {
          Authorization: token
        }
      });

      alert("Usuário apagado com sucesso!");

      localStorage.removeItem("token");

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Erro ao deletar usuário");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="bg-white p-8 rounded-xl shadow-md text-center">

        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Confirmar Exclusão
        </h1>

        <p className="mb-6">
          Tem certeza que deseja deletar seu usuário?
        </p>

        <div className="flex gap-4 justify-center">

          <button
            onClick={deletarUsuario}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Sim, deletar
          </button>

          <button
            onClick={() => navigate("/listarusuarios")}
            className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeletarPerson;