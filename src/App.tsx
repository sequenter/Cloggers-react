import './App.css';

import { CollectionLog, Featured, Footer, Header, Ranking, RecentItems } from '@components';

import { useSearch } from '@hooks/useSearch';

import { useEffect } from 'react';

function App() {
  const { setGroupId } = useSearch();

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const group = params.get('group');

    if (group) {
      setGroupId(group);
    }
  }, [setGroupId]);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen">
        <Header />

        <main className="flex flex-col container mx-auto gap-4 mb-4 px-2 grow">
          <Ranking />

          <CollectionLog />

          <RecentItems />

          <Featured />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default App;
