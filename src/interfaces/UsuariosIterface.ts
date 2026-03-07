import type { IInputValues } from "./ConhecimentoInterface";


export interface Person{

  id: string;
  nome: string
  email: string;
  conhecimentos: IInputValues[] | null ;
}