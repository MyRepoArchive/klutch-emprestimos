import { useContext, useEffect, useState } from 'react'
import { InputMoney } from '../components/InputMoney'
import { Subject } from '../components/Subject'
import api from '../services/api.json'
import { RateTable } from '../components/RateTable'
import styles from '../styles/pages/Home.module.css'
import { Button } from '../components/Button'
import Link from 'next/link'
import { Main } from '../components/Main'
import { LoanContext } from '../contexts/LoanContext'
import { useRouter } from 'next/router'

export default function Home() {
  const [inputedDesiredValue, setInputedDesiredValue] = useState<number>();
  const { desiredValue, installment, rateTable, setDesiredValue, setInstallment, setRateTable } = useContext(LoanContext)
  const router = useRouter();

  useEffect(() => { router.query?.error && alert(router.query?.error) }, [router])

  return (
    <div className={styles.container}>
      <Main className={styles.main}>
        <Subject text="Simulação de Taxas" plusIcon />

        {/* Formulário para buscar o valor do empréstimo */}
        <form className={styles.desiredValue} onSubmit={(e) => {
          e.preventDefault();
          setDesiredValue(Number(inputedDesiredValue.toFixed(2)));
        }}>
          <strong className={styles.title}>Valor Desejado</strong>

          <InputMoney onChange={(e) => setInputedDesiredValue(Number(e.target.value))} />

          <Button text="Calcular" type="submit" color="orange" />
        </form>


        {desiredValue && (
          /* Formulário para selecionar a tabela e as parcelas */
          <form className={styles.desiredTableAndInstallment}>
            {api.rateTable.map((rateTable) => (
              <div className={styles.inputContainer} key={rateTable.id}>
                <input
                  required
                  type="radio"
                  name='rate-table'
                  id={rateTable.id + ''}
                  value={rateTable.id}
                  onChange={(e) => e.target.checked && setRateTable(rateTable)}
                />

                <label htmlFor={rateTable.id + ''}>
                  <RateTable
                    disabled={rateTable?.id !== rateTable.id}
                    {...rateTable}
                    className={`${styles.rateTable}`}
                    onSelect={(installmentID) => setInstallment(rateTable.installments.find((installment) => installment.id === installmentID))}
                    selectedInstallmentID={installment?.id}
                  />
                </label>
              </div>
            ))}

            <footer className={styles.tableAndInstallmentInfo}>
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.tableName}>Nome: {rateTable?.name}</div>
                  <div className={styles.installments}>Parcelas: {installment?.installments || ''}</div>
                  <div className={styles.installmentValue}>
                    Valor da Parcela: {installment && `R$${installment?.installmentValue.toFixed(2).replace('.', ',')}`}
                  </div>
                </div>

                <Link href={
                  desiredValue && rateTable && installment
                    ? `/search-client`
                    : '/?error=Insira um valor entre 300 e 10000 reais e selecione uma parcela!'
                }>
                  <a rel="next" target="_self">
                    <Button text="Avançar" type="submit" color="orange" />
                  </a>
                </Link>
              </div>
            </footer>
          </form>
        )}
      </Main>
    </div>
  )
}
