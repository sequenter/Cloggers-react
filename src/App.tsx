import './App.css';

import { CollectionLog, Featured, Footer, Header, Ranking, RecentItems } from '@components';

import { useCollections } from '@hooks/useCollections';
import { useGroup } from '@hooks/useGroup';
import { useRecent } from '@hooks/useRecent';
import { useSearch } from '@hooks/useSearch';

import { useEffect } from 'react';

function App() {
  const { setGroupId } = useSearch();
  const { isLoading: collectionsLoading } = useCollections();
  const { isLoading: groupLoading } = useGroup();
  const { isLoading: recentLoading } = useRecent();

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
      {(collectionsLoading || groupLoading || recentLoading) && (
        <div className="absolute h-full">
          <span className="sticky p-2 top-2 ml-2 text-shadow-none border-2 z-50 text-white border-white bg-black">
            Loading - please wait.
          </span>
        </div>
      )}

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
