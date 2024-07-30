import { type FC } from "react";

export const EntryCardSkeleton: FC = () => (
  <div>
    <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 animate-pulse">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div className="lg:col-span-4 lg:row-end-1 flex w-full">
          <div className="bg-gray-200 rounded-lg h-96 w-full" />
        </div>

        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none w-full">
          <div className="flex flex-col-reverse">
            <div className="mt-4">
              <div className="bg-gray-200 h-10 w-full rounded-lg" />
              <div className="mt-2 h-4 w-4/6 rounded bg-gray-200" />
            </div>
            <div>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full h-6 w-6"/>
                <div className="ml-2 rounded-lg w-28 h-6 bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-200 rounded-lg h-5 w-2/3" />
          <div className="mt-1 bg-gray-200 rounded-lg h-5 w-full" />
          <div className="mt-1 bg-gray-200 rounded-lg h-5 w-1/3" />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="flex w-full h-14 items-center justify-center rounded-md bg-gray-200 px-8 py-3" />
            <div className="flex w-full h-14 items-center justify-center rounded-md bg-gray-200 px-8 py-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
)