import Image from "next/image";
import Sort from "../components/mainpage/sort";
import MainPageCard from "@/components/ui/mainpage-card";
import { useState } from "react";

export default function Home() {
  const [filteredDatas, setFilteredDatas] = useState([])

  const filterDatasHandler = (filterDatas) => {
    setFilteredDatas(filterDatas.filter(data => data !== undefined));
  }

  return (
    <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-col items-start justify-between px-5">
      <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-row items-start mt-2 justify-between px-0 lg:px-10">
        <Sort filterDatasHandler={filterDatasHandler} />

        <div className="flex flex-row flex-wrap w-auto items-start justify-center gap-8 max-w-full lg:max-w-[75%] flex-shrink mt-14 lg:mt-0">
          {
            filteredDatas
              .filter((data) => data !== undefined).length > 0 && filterDatasHandler && (
              <>
                <div className="w-full h-10 self-center flex flex-row flex-wrap items-center justify-center gap-2 lg:gap-8 text-center pl-0 lg:pl-10 mb-20
                 lg:mb-0">
                <h1 className="text-xl font-semibold">Filters:</h1>
                  {filteredDatas
                    .filter((data) => data !== undefined)
                    .filter((data) => data.length > 0)
                    .map((data, index) => (
                      <p className="min-w-fit cursor-pointer text-black p-2 border border-black rounded-lg" key={index} onClick={() => setFilteredDatas(filteredDatas.filter(item => item !== data))}>
                        {data}
                      </p>
                    ))}
                </div>
              </>
            )
          }

          <MainPageCard />
          <MainPageCard />
          <MainPageCard />
          <MainPageCard />
          <MainPageCard />
        </div>
      </div>
    </div>
  );
}
