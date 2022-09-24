import React from 'react';
import TodoList from './Components/TodoList';
import toast, { Toaster } from 'react-hot-toast';

function App() {
 

  return (
    <>
 
        <Toaster />
 <TodoList/>
    
    </>
  );
}

export default App;
