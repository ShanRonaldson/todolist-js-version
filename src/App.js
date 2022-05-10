import './App.css';
import { useState, useRef } from 'react';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const columnsDef = [
  { headerName: 'Task', field: 'taskName' },
  { headerName: 'Date', field: 'taskDate' },
  {
    headerName: 'Priority', field: 'taskPriority', 
    cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
  }
]

const gridOptions={
  defaultColDef:{
    flex: 1,
    sortable: true, 
    filter: true,
    floatingFilter: true
  },
  columnsDef: columnsDef,
  animateRows: true
}

function App() {

  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState("");
  const gridRef = useRef();

  const deleteTask = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTasks(tasks.filter((task, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex
      ))
    } else{
      alert('Please select a row first')
    }

  };

  const handleSubmit = () => {
    const newToDo = { taskName: name, taskDate: date, taskPriority: priority };
    setTasks([...tasks, newToDo]);
    setName("");
    setDate('');
    setPriority("");
  };

  return (
    <>
      <div className="header">
        <div className="inputContainer">
          <TextField
            name="taskName"
            id="taskName"
            placeholder="Task..."
            rows={4}
            multiline
            onChange={e => setName(e.target.value)}
            value={name}
          />

          <input
            type="date"
            name="date"
            id="date"
            placeholder="Date"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <Box sx={{ m: 1, minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Age"
                onChange={e => setPriority(e.target.value)}
                autoWidth
              >
                <MenuItem value={'Low'}>Low</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'High'}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>


        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Task
        </Button>
      </div>
      <div className='todoList'>
        <Button
          variant='outlined'
          color='error'
          className='deleteButton'
          onClick={deleteTask}>
          Delete selected
        </Button>

        <div className="ag-theme-material"
          style={{ height: '700px', width: '70%', margin: 'auto' }}>
          <AgGridReact
            columnDefs={columnsDef}
            rowData={tasks}
            rowSelection="single"
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>
      </div>

    </>
  );
}

export default App;
