import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import JobsCard from "./JobsCard";

export default function Intro() {
  const [search, setSearch] = useState("");
  const jobData = useSelector((state) => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([]);
  const [doneSearch, setDoneSearch] = useState(false);
  

 

  return (
    <>
      <div className="w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  ">
        <div className="lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col ">
          <h1 className="md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black ">
            Game On:{" "}
            <span className="text-orange-300"> Esports Careers Await!</span>{" "}
          </h1>
          <p className="md:text-lg sm:text-sm text-xs mb-20 text-gray-400">
            2400 Peoples are daily search in this portal, 100 user added job
            portal!
          </p>
          
        </div>
        <div className="w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex">
          <Image
            width={600}
            height={700}
            src="/engage-with-us.webp"
            alt="Home Image"
          />
        </div>
      </div>
      {doneSearch && (
        <div className="w-full flex flex-wrap items-center justify-center py-2 px-2">
          {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
            filterJobs?.map((job) => {
              return <JobsCard job={job} key={job?._id} />;
            })
          ) : (
            <p className="text-sm text-center font-semibold  text-red-500">
              Sorry No such Categories Job Available Right Now
            </p>
          )}
        </div>
      )}
    </>
  );
}
