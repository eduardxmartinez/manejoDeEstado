import React from "react";

const SECURITY_CODE = "paradigma"

function UseState({name}) {
    const [state, setState] = React.useState({
        value: "",
        loading: false,
        error: false,
        deleted: false,
        confirmed: false
    })


    // const [value, setValue] = React.useState("");
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true
        })
    }

    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
            // error: false
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ""
        })
    }

    React.useEffect(()=>{
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 3000)
        }
    },[state.loading]);

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
                        onWrite(event.target.value)
                    }
                />
                <button
                    onClick={() => 
                        onCheck()
                    }
                >Comprobar</button>
            </div>
        )
    } else if(!!state.confirmed && !state.deleted) {
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>¿Segurx?</p>
                <button 
                onClick={() => onDelete()}>
                    si
                </button>
                <button
                    onClick={() => onReset()}>
                    Volver
                </button>
            </div>
        )
        
    } else if(state.deleted && state.confirmed) {
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => onReset()}>
                    Resetear
                </button>
            </div>
        )
        
    }
}

export { UseState };
