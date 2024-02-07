import React from "react";

const Dashboard = () => {
  return (
    <>
      <section className="h-80">
        <div className="lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Admin Dashboard.
              <strong className="font-extrabold text-red-700 sm:block">
                {" "}
                Track Conversion.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
