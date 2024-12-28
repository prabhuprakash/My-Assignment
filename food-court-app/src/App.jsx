import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <div className="app-container">
          <header className="fixed-elements">
            <Header />
            <Cart />
            <Checkout />
          </header>
          <main className="scrollable-content">
            <Meals />
          </main>
        </div>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
