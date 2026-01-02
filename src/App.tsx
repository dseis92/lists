import { ThemeProvider } from './contexts/ThemeContext';
import { ListsProvider } from './contexts/ListsContext';
import AppHeader from './components/layout/AppHeader';
import Sidebar from './components/layout/Sidebar';
import ListContainer from './components/layout/ListContainer';

function App() {
  return (
    <ThemeProvider>
      <ListsProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <AppHeader />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <ListContainer />
          </div>
        </div>
      </ListsProvider>
    </ThemeProvider>
  );
}

export default App;
