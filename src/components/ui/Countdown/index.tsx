import { useContext, useEffect } from 'react'
import { CyclesContext } from '@/context/cycles-context'

import { differenceInSeconds } from 'date-fns'

import { CountdownContainer, Separator } from './styles'

export default function Countdown() {
    const {
        activeCycle,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setAmountSecondsPassed,
        activeCycleId,
    } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let countdownRunningCycle: number

        if (activeCycle) {
            countdownRunningCycle = setInterval(() => {
                const currentDate = new Date()
                const secondsDifference = differenceInSeconds(
                    currentDate,
                    activeCycle.startDate
                )
                const isFinished = secondsDifference >= totalSeconds

                if (isFinished) {
                    markCurrentCycleAsFinished()
                    clearInterval(countdownRunningCycle)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => clearInterval(countdownRunningCycle)
    }, [
        activeCycle,
        totalSeconds,
        activeCycleId,
        setAmountSecondsPassed,
        markCurrentCycleAsFinished,
    ])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]} </span>

            <Separator />

            <span>{seconds[0]}</span>
            <span>{seconds[1]} </span>
        </CountdownContainer>
    )
}
