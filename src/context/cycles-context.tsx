import { createContext, useState, useReducer, useEffect } from 'react'
import cyclesReducer, { CyclesState } from '@/reducers/cycles-reducer'

export interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    stopCurrentCycle: () => void
    setAmountSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
}
export const CyclesContext = createContext({} as CyclesContextType)

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    stoppedDate?: Date
    finishedDate?: Date
}

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextProviderProps {
    children: React.ReactNode
}
export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

    const getCyclesStoredInLocal = (initialState: CyclesState) => {
        const storedStateAsJSON = localStorage.getItem(
            '@pomodoro-timer:cycles-state-1.0.0'
        )

        if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)
        return initialState
    }
    const [cyclesState, dispatchCycles] = useReducer(
        cyclesReducer,
        {
            activeCycleId: null,
            cycles: [],
        },
        getCyclesStoredInLocal
    )
    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const createNewCycle = (data: CreateCycleData) => {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatchCycles({
            type: 'CREATE_NEW_CYCLE',
            payload: { newCycle, activeCycleId: newCycle.id },
        })

        setAmountSecondsPassed(0)
    }

    const stopCurrentCycle = () =>
        dispatchCycles({
            type: 'STOP_CURRENT_CYCLE',
            payload: { activeCycleId },
        })

    const markCurrentCycleAsFinished = () =>
        dispatchCycles({
            type: 'MARK_WITH_FINISHED',
            payload: { activeCycleId },
        })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                stopCurrentCycle,
                setAmountSecondsPassed,
                markCurrentCycleAsFinished,
                createNewCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
