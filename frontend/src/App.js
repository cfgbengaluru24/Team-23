import React from 'react';
import UserTable from './components/UserTable';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>User Management System</h1>
            </header>
            <main>
                <UserTable/>
            </main>
        </div>
    );
}

export default App;
