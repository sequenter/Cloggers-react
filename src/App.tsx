import './App.css';

import { CollectionLog, Footer, Header, Ranking } from '@components';

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen">
        <Header />

        <main className="flex flex-col container mx-auto gap-4 px-2 grow">
          <Ranking />

          <CollectionLog />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
