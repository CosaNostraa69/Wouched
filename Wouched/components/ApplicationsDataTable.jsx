import { change_application_status } from "@/Services/job";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function ApplicationsDataTable({ application }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(application);
  }, [application]);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(Data);
  }, [Data]);

  const handleAcceptStatus = async (id) => {
    const data = { id, status: "approved" };
    const res = await change_application_status(data);
    if (res.success) {
      router.push("/User/postedJob");
    } else {
      toast.error(res.message);
    }
  };

  const handleRejectStatus = async (id) => {
    const data = { id, status: "rejected" };
    const res = await change_application_status(data);
    if (res.success) {
      router.push("/User/postedJob");
    } else {
      toast.error(res.message);
    }
  };

  const handleDownloadCV = async (name) => {
    const fileUrl = `/uploads/${name}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      compact: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      compact: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => (
    //     <p
    //       className={`uppercase font-semibold ${
    //         row?.status === "approved" ? "text-green-500" : ""
    //       }  ${row?.status === "rejected" ? "text-red-600" : ""}`}
    //     >
    //       {row?.status}
    //     </p>
    //   ),
    // },
    {
      name: "CV",
      selector: (row) => (
        <button
          onClick={() => handleDownloadCV(row?.cv)}
          className="w8 h-8 md:w-10 md:h-10 rounded-full border-2 border-indigo-600 flex items-center justify-center hover:bg-indigo-600 transition-all duration-700"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/download--v1.png"
            alt="download--v1"
          />{" "}
        </button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-start space-x-2">
          <button
            onClick={() => router.push(`/User/applicationDetail/${row?._id}`)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-indigo-600 flex items-center justify-center hover:bg-indigo-600 transition-all duration-700"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/windows/32/details-popup.png"
              alt="details-popup"
            />{" "}
          </button>
          <button
            onClick={() => handleAcceptStatus(row?._id)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-green-600 flex items-center justify-center hover:bg-green-600 transition-all duration-700"
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/windows/32/approval.png"
              alt="approval"
            />{" "}
          </button>
          <button
            onClick={() => handleRejectStatus(row?._id)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-red-600 flex items-center justify-center hover:bg-red-600 transition-all duration-700"
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios/50/do-not-disturb.png"
              alt="do-not-disturb"
            />{" "}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (search === "") {
      setFilteredData(Data["hydra:member"]);
      setLoaded(true);
    } else {
      setFilteredData(
        Data["hydra:member"].filter((item) => {
          const itemData = item?.name.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
      );
      setLoaded(true);
    }

    console.log("fd", filteredData);
  }, [search, Data]);

  return (
    <>
      {Data && loaded ? (
        <DataTable
          subHeaderAlign={"right"}
          columns={columns}
          data={filteredData}
          keyField="id"
          pagination
          title={`Total Applications : ${Data?.length}`}
          fixedHeader
          fixedHeaderScrollHeight="79%"
          selectableRows
          selectableRowsHighlight
          subHeader
          persistTableHead
          subHeaderComponent={
            <input
              className="w-60  py-2 px-2  outline-none  border-b-2 border-indigo-600"
              type={"search"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Search with Applicant  name..."}
            />
          }
          className="h-screen bg-white"
        />
      ) : (
        <p className="my-4 ">No Applications ...</p>
      )}
    </>
  );
}
