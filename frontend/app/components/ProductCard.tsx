import React from "react";

const ProductCard = ({ data }: any) => {
  return (
    <div className="flex flex-wrap gap-10 my-2 justify-evenly">
      <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
        <img
          alt=""
          src={data?.image[0]}
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Name</dt>

              <dd className="text-sm text-gray-500">{data?.name}</dd>
            </div>

            <div>
              <dt className="sr-only">{data?.name}</dt>

              <dd className="font-medium">
                {data?.description?.substr(0, 100)}...
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Price</p>

                <p className="font-medium">{data?.price}</p>
              </div>
            </div>
            {data?.properties?.map((prop: any) => (
              <>
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <svg
                    className="size-4 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">{prop?.property}</p>

                    <p className="font-medium">{prop?.value}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
