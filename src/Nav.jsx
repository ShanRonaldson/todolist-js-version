import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import App from './App';
import { Home } from './Home';

export const Navi = () => {

    const [value, setValue] = useState('home')

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return [
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Home" value={'home'} />
                <Tab label="ToDos" value={'todos'} />
            </Tabs>

            {value === 'home' && <Home />}
            {value === 'todos' && <App />}
        </div>
    ]
}