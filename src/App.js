import './App.css';
import { UseState } from './UseState';
import { ClassState } from './ClassState';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className='App'>
      <UseState name="Use State"/>
      <ClassState name="Class State" />
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export {App};
