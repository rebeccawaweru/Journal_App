import React from "react";
import Navigation from "./src/navigation/Navigation";
import JournalProvider from "./src/context/Journal";
const App = () => {
    return <JournalProvider>
    <Navigation/>
    </JournalProvider>
};

export default App;