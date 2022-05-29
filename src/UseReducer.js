
import React from "react";

const SECURITY_CODE = "paradigma"

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => { dispatch({ type: actionTypes.confirm });}
    const onError = () => { dispatch({ type: actionTypes.error });}
    const onCheck = () => { dispatch({ type: actionTypes.check });}
    const onReset = () => { dispatch({ type: actionTypes.reset });}
    const onDelete = () => { dispatch({ type: actionTypes.delete });}
    
    const onWrite = (event) => {
        dispatch({ type: actionTypes.write, payload: event.target.value })
    }

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm()
                } else {
                    onError()
                }
            }, 3000)
        }
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que lo quieres eliminar</p>

                {(!state.loading && state.error) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                />
                <button onClick={onCheck}
                >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>¿Segurx?</p>
                <button onClick={onDelete}>
                    si
                </button>
                <button onClick={onReset}>
                    Volver
                </button>
            </div>
        )

    } else if (state.deleted && state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>
                    Resetear
                </button>
            </div>
        )

    }
}

const initialState = {
    value: "",
    loading: false,
    error: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    check: "CHECK",
    write: "WRITE",
    delete: "DELETE",
    reset: "RESET"
}

const reducerObj = (state, paylod) => ({
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        loading: false,
        error: true
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.write]: {
        ...state,
        value: paylod
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ""
    }
})

const reducer = (state, action) => {
    if (reducerObj(state)[action.type]) {
        return reducerObj(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer };