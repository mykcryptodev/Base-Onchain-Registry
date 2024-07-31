import Head from "next/head";
import EntryCard from "~/components/EntryCard";
import { EntryCardSkeleton } from "~/components/EntryCardSkeleton";
import WalletComponents from "~/components/Wallet";
import { type Entry } from "~/types/entry";

import { api } from "~/utils/api";

export default function Home() {
  const { data: entries, isLoading, fetchNextPage } = api.entries.getEntries.useInfiniteQuery({
    limit: 10,
  }, {
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.current_page < lastPage.pagination.total_pages) {
        return (lastPage.pagination.current_page + 1).toString();
      }
      return undefined;
    },
  });
  const { data: featuredEntry } = api.entries.getFeaturedEntry.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  console.log({ entries, featuredEntry });

  return (
    <>
      <Head>
        <title>Base Onchain Registry</title>
        <meta name="description" content="A place to view the awesome apps in the Onchain Registry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-2 container max-w-7xl mx-auto mt-20">
        <WalletComponents />
        <h1 className="font-bold text-6xl text-center">Onchain Content Network</h1>
        {featuredEntry && (
          <div className="shadow-xl rounded-xl bg-gradient-to-br from-blue-500 via-teal-300 to-purple-500 text-white font-semibold p-0.5 mx-4 mt-10">
            <div className="bg-white rounded-xl">
              <EntryCard entry={featuredEntry} isFeatured />
            </div>
          </div>
        )}
        {!entries && isLoading && Array(10).fill(null).map((_, index) => <EntryCardSkeleton key={index} />)}
        {entries?.pages.map((page, pageIndex) => (
          page.data.map((entry: Entry, entryIndex) => {
            return (
              <div key={entry.id}>
                <EntryCard  entry={entry} />
                {pageIndex === entries.pages.length - 1 && entryIndex === page.data.length - 1 && page.pagination.current_page < page.pagination.total_pages && (
                  <button
                    className="mb-20 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={() => {
                      void fetchNextPage();
                    }}
                  >
                    Load More
                  </button>
                )}
              </div>
            )
          })
        ))}
      </main>
    </>
  );
}
