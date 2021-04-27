import './App.css';
import { StyleProvider, ThemePicker } from 'vcc-ui';
import ProductList from './components/ProductList';

function App() {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <header className="header bg-dark"></header>
        <ProductList />
        <footer className="footer bg-dark"></footer>
      </ThemePicker>
    </StyleProvider>
  );
}

export default App;
