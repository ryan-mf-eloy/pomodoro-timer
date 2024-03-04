import { Cycle } from '@/context/cycles-context'

interface CycleActionReducer {
    type: 'CREATE_NEW_CYCLE' | 'STOP_CURRENT_CYCLE' | 'MARK_WITH_FINISHED'
    payload: {
        newCycle?: Cycle
        activeCycleId: string | null
    }
}
export interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export default function cyclesReducer(
    { cycles, activeCycleId }: CyclesState,
    { payload, type }: CycleActionReducer
): CyclesState {
    switch (type) {
        case 'CREATE_NEW_CYCLE': {
            return {
                cycles: [...cycles, payload.newCycle!],
                activeCycleId: payload.activeCycleId,
            }
        }

        case 'STOP_CURRENT_CYCLE': {
            return {
                cycles: cycles.map((cycle) => {
                    const isActiveCycle = cycle.id === activeCycleId
                    const currentDate = new Date()

                    if (isActiveCycle)
                        return { ...cycle, stoppedDate: currentDate }

                    return cycle
                }),
                activeCycleId: null,
            }
        }

        case 'MARK_WITH_FINISHED': {
            return {
                cycles: cycles.map((cycle) => {
                    const isActiveCycle = cycle.id === activeCycleId
                    const currentDate = new Date()

                    if (isActiveCycle)
                        return { ...cycle, finishedDate: currentDate }

                    return cycle
                }),
                activeCycleId: null,
            }
        }
    }
}
