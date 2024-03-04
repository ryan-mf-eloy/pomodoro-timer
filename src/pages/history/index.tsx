import { useContext } from 'react'
import { CyclesContext } from '@/context/cycles-context'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { HistoryContainer, HistoryList, Status } from './styles'

export default function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {cycles &&
                            cycles.map(
                                ({
                                    id,
                                    minutesAmount,
                                    startDate,
                                    task,
                                    stoppedDate,
                                    finishedDate,
                                }) => {
                                    const formattedStartDate =
                                        formatDistanceToNow(startDate, {
                                            addSuffix: true,
                                            locale: ptBR,
                                        })

                                    const isCompleted = !!finishedDate
                                    const isStopped = !!stoppedDate
                                    const isRunning = !isCompleted && !isStopped

                                    return (
                                        <tr key={id}>
                                            <td>{task}</td>
                                            <td>{minutesAmount} minutos</td>
                                            <td>{formattedStartDate}</td>
                                            <td>
                                                {isCompleted && (
                                                    <Status statusColor='green'>
                                                        Concluído
                                                    </Status>
                                                )}
                                                {isStopped && (
                                                    <Status statusColor='red'>
                                                        Interrompido
                                                    </Status>
                                                )}
                                                {isRunning && (
                                                    <Status statusColor='yellow'>
                                                        Em andamento
                                                    </Status>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
