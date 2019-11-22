export interface IAppState {
    counter: number;
}

export function rootReducer(state: IAppState, action): IAppState {
    if (action.type === 'INCREMENT') {
        return { counter: state.counter + 1}
    }
    return state;
}