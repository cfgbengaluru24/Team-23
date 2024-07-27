import React from 'react';
import UserTable from './components/UserTable';
import RelatedOccupations from './components/RelatedOccupations';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>User Management System</h1>
            </header>
            <main>
                <UserTable/>
                <RelatedOccupations/>
            </main>
        </div>
    );
}

export default App;
