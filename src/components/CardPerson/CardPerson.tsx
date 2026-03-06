import { Link } from "react-router-dom";
import type { Person } from "../../interfaces/UsuariosIterface";

interface CardPersonProps {
  person: Person;
}

function CardPerson({ person }: CardPersonProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">

      <header className="py-2 px-6 blue-900: #1E3A5F text-white font-bold text-2xl">
        Usuário
      </header>

      <div className="p-6 blue-600: #2563EB h-full">
        <p className="text-xl font-bold">{person.nome}</p>
        <p className="text-lg">{person.email}</p>
      </div>

      <div className="flex">
        <Link
          to={`/editarperson/${person.id}`}
          className="w-full text-gray-100 blue-400: #60A5FA hover: blue-900: #1E3A5F flex items-center justify-center py-2"
        >
          Editar
        </Link>

        <Link
          to={`/deletarperson/${person.id}`}
          className="w-full text-slate-100 bg-red-400 hover:bg-red-700 flex items-center justify-center"
        >
          Deletar
        </Link>
      </div>

    </div>
  );
}

export default CardPerson;
