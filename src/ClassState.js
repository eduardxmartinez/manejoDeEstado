import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma"

class ClassState extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            error: false,
            loading: false,
        }
    }

    // componentDidMount(){

    // }

    componentDidUpdate(){
        if (!!this.state.loading) {
            setTimeout(() => {

                if(this.state.value === SECURITY_CODE) {
                    this.setState({ loading: false, error: false });
                } else {
                    this.setState({ loading: false, error: true });
                }
  
            }, 3000)
        }
    }

    render() {
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que lo quieres eliminar</p>

                {(this.state.error && !this.state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}
                {this.state.loading && (
                    <Loading/>
                )}

                <input 
                placeholder="Código de seguridad"
                value={this.state.value}
                onChange={(event)=>{
                    this.setState({value: event.target.value})
                }}
                />
                <button
                    onClick={() => this.setState({loading: !this.state.loading})}
                >Comprobar</button>
            </div>
        )
    }
}

export { ClassState };
