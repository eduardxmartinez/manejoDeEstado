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

    React.useEffect(()=>{
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        loading: false,
                        error: false,
                        confirmed: true
                    })
                } else {
                    setState({
                        ...state,
                        loading: false,
                        error: true
                    })
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
                    onChange={(event) => {
                        // setError(false); opcional
                        setState({
                            ...state,
                            value: event.target.value,
                            // error: false
                        })
                    }}
                />
                <button
                    onClick={() => setState({
                        ...state,
                        loading: true,
                    })}
                >Comprobar</button>
            </div>
        )
    } else if(!!state.confirmed && !state.deleted) {
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>¿Segurx?</p>
                <button 
                onClick={() => setState({
                        ...state,
                        deleted: true,
                })}>
                    si
                </button>
                <button
                    onClick={() => setState({
                        ...state,
                        confirmed: false,
                        value:""
                })}>
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
                    onClick={() => setState({
                        ...state,
                        confirmed: false,
                        deleted: false,
                        value:""
                    })}>
                    Resetear
                </button>
            </div>
        )
        
    }
}

export { UseState };
