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
      console.log(resposta)

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

    <h1 className="font-serif text-3xl text-center font-bold text-blue-700 tracking-tight mb-6">
      KnowHub 
      <span className="block text-blue-400 text-lg font-semibold mt-1">
        Busque e Ofereça seus Conhecimentos Aqui!</span>
    </h1>

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

