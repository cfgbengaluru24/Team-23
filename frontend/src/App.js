import React from 'react';
import UserTable from './components/UserTable';
import RelatedOccupations from './components/RelatedOccupations';
import FinancialChart from './components/FinancialChart';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>User Management System</h1>
            </header>
            <main>
                <UserTable/>
                {/* <FinancialChart/>
                <RelatedOccupations/> */}
            </main>
        </div>
    );
}

export default App;
