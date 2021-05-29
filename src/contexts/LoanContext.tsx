import React, { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useEffect, useState } from "react";
import { IInstallment, ITable } from "../components/RateTable";
import { IClient } from "../pages/search-client";
import { IModality } from '../pages/modality'

export interface ILoanContextData {
  rateTable?: ITable;
  setRateTable?: Dispatch<SetStateAction<ITable>>
  installment?: IInstallment;
  setInstallment?: Dispatch<SetStateAction<IInstallment>>
  desiredValue?: number;
  setDesiredValue?: Dispatch<SetStateAction<number>>
  client?: IClient;
  setClient?: Dispatch<SetStateAction<IClient>>
  modality?: IModality
  setModality?: Dispatch<SetStateAction<IModality>>
}

export const LoanContext = createContext<ILoanContextData>({});

export interface ILoanProviderProps {
  children: ReactNode;
}

export function LoanProvider({ children }: ILoanProviderProps) {
  const [rateTable, setRateTable] = useState<ITable>();
  const [installment, setInstallment] = useState<IInstallment>();
  const [desiredValue, setDesiredValue] = useState<number>();
  const [client, setClient] = useState<IClient | null>();
  const [modality, setModality] = useState<IModality>()

  return (
    <LoanContext.Provider value={{
      desiredValue,
      installment,
      rateTable,
      client,
      modality,
      setDesiredValue,
      setInstallment,
      setRateTable,
      setClient,
      setModality
    }}>
      {children}
    </LoanContext.Provider>
  );
}