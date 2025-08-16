import './App.css';

import { Footer, Header } from '@components';

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen">
        <Header />

        <main className="flex flex-col container mx-auto px-2 grow last:mb-4"></main>
      </div>

      <Footer />
    </>
  );
}

export default App;
