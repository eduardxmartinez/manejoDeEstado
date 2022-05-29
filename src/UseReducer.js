
import React from "react";

const SECURITY_CODE = "paradigma"

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer,initialState);

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    dispatch({type: "CONFIRM"})
                } else {
                    dispatch({ type: "ERROR" })
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
                    onChange={(event) =>
                        dispatch({ type: "WRITE", payload: event.target.value })
                    }
                />
                <button
                    onClick={() =>
                        dispatch({ type: "CHECK" })
                    }
                >Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>¿Segurx?</p>
                <button
                    onClick={() => dispatch({ type: "DELETE" })}>
                    si
                </button>
                <button
                    onClick={() => dispatch({ type: "RESET" })}>
                    Volver
                </button>
            </div>
        )

    } else if (state.deleted && state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => dispatch({ type: "RESET" })}>
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

const reducerObj = (state, paylod) => ({
    "CONFIRM": {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    "ERROR": {
        ...state,
        loading: false,
        error: true
    },
    "CHECK": {
        ...state,
        loading: true,
    },
    "WRITE": {
        ...state,
        value: paylod
    },
    "DELETE": {
        ...state,
        deleted:true
    },
    "RESET":{
        ...state,
        confirmed:false,
        deleted: false,
        value:""
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