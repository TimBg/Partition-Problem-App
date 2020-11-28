import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, InputLabel } from '@material-ui/core';

import { split } from './reducers/mainReducer';

import './App.css';

const App = ({ store }) => {
    const [result, setResult] = useState(undefined);
    const dispatch = useDispatch();

    const splitArr = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (function (JSONFile) {
            return function (e) {
                try {
                    let json = JSON.parse(e.target.result);
                    dispatch(split(json.set));
                    setResult(JSON.stringify(store.getState().branch1.result, null, '\t'));
                } catch (error) {
                    alert('Error');
                }
            }
        })(file);
        reader.readAsText(file);
        e.target.value = '';
    }

    return (
        <div className='App'>
            <div className='wrapper'>
                <InputLabel>Split</InputLabel>
                <Input type='file' onChange={(e) => splitArr(e)} />
            </div>
            <div className='wrapper'>
                {result !== 'null' && result}
            </div>
        </div>
    );
}

export default App;
