import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Person } from "../../interfaces/UsuariosIterface";
import { SyncLoader } from "react-spinners";
import CardPerson from "../../components/CardPerson/CardPerson";

function ListarPerson() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [person, setPerson] = useState<Person[]>([]);

  async function buscarPerson() {
    try {
      setIsLoading(true);

      const resposta = await api.get('/person');

      setPerson(resposta.data);

    } catch (error: any) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarPerson();
  }, []);

  return (
    <>
      {isLoading && (
        <SyncLoader
          color="#1E3A5F"
          size={32}
        />
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">

          {(!isLoading && person.length === 0) && (
            <span className="text-3xl text-center my-8">
              Nenhum Usuário foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {person.map((p) => (
              <CardPerson key={p.id} person={p} />
            ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default ListarPerson;



// --blue-50: #EFF6FF;
//   --blue-100: #DBEAFE;
//   --blue-200: #BFDBFE;
//   --blue-400: #60A5FA;
//   --blue-500: #3B82F6;
//   --blue-600: #2563EB;
//   --blue-700: #1D4ED8;
//   --blue-900: #1E3A5F;
//   --white: #FFFFFF;
//   --gray-50: #F9FAFB;
//   --gray-100: #F3F4F6;
//   --gray-300: #D1D5DB;
//   --gray-400: #9CA3AF;
//   --gray-500: #6B7280;
//   --gray-700: #374151;
//   --gray-900: #111827;
