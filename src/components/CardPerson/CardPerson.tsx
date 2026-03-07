import { useNavigate } from "react-router-dom";
import type { Person } from "../../interfaces/UsuariosIterface";

interface CardPersonProps {
  person: Person;
}

function CardPerson({ person }: CardPersonProps) {

  const navigate = useNavigate();
  const loggedUserId = localStorage.getItem("id");

  return (
    <div
      className="relative bg-white border-[1.5px] border-blue-100 rounded-2xl p-5 overflow-hidden transition-all hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 flex flex-col justify-between"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-blue-500" />

      <div className="mt-3">
        <p className="text-sm font-bold text-gray-900">{person.nome}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {loggedUserId !== String(person.id) && (
            <span className="font-medium text-gray-500">Entre em contato: </span>
          )} {person.email}</p>

        <p className="text-xs font-semibold text-gray-700 mt-3 mb-2">
          Conhecimentos
        </p>

        <div className="flex flex-wrap gap-2">
          {person.conhecimentos?.map((conhecimento) => (
            <span
              key={conhecimento.id}
              className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
            >
              {conhecimento.titulo}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        {loggedUserId === String(person.id) && (
          <button
            onClick={() => navigate(`/editarperson/${person.id}`, { state: { person } })}
            className="w-full text-center text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-2 rounded-full hover:bg-blue-100 transition"
          >
            Editar
          </button>
        )}

        {loggedUserId === String(person.id) && (
          <button
            onClick={() => navigate(`/deletarperson/${person.id}`)}
            className="w-full text-center text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-2 rounded-full hover:bg-red-100 transition"
          >
            Deletar
          </button>
        )}
      </div>
    </div>
  );
}

export default CardPerson;