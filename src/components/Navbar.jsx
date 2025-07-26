/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [error, setError] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    info: "",
    symbol: "",
    lastRefreshed: "",
    interval: "",
    outputSize: "",
    timeZone: "",
  });
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [interval, setInterval] = useState("")
  

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const fetchedData = async () => {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo`
          );
          const result = await response.json();
          const companyDetails = result["Meta Data"];
          return companyDetails;
        };
        const companyDetails = await fetchedData();
        const info = companyDetails["1. Information"];
        const symbol = companyDetails["2. Symbol"];
        const lastRefreshed = companyDetails["3. Last Refreshed"];
        const interval = companyDetails["4. Interval"];
        const outputSize = companyDetails["5. Output Size"];
        const timeZone = companyDetails["6. Time Zone"];
        setCompanyInfo({
          info,
          symbol,
          lastRefreshed,
          outputSize,
          timeZone,
        });
      } catch (error) {
        setError(true);
      }
    })();
    const pathname = location.pathname;
    let timeframe = "";
    if (pathname === "/hour") {
      timeframe = "1 Hour";
    } else if (pathname === "/day") {
      timeframe = "1 Day";
    }

    setInterval(timeframe);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="text-teal-200 flex">
        <div className="text-2xl font-bold p-2.5 mr-[15rem]">{companyInfo.symbol} Stock</div>
        <div className="text-gray-400 text-xl font pt-3">TimeFrame : </div>
        <div className="dropdown bg-slate-900 border-teal-500 rounded-3xl">
          <div
            tabIndex={0}
            role="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="btn m-1  hover:bg-slate-900 hover:text-teal-100 hover:rounded-md hover:border-slate-500 font-bold  bg-slate-500 text-slate-900"
          >
            {interval || "5 Min"}
          </div>
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-slate-500 rounded-box w-52 hover:bg-slate-900"
            >
              <li>
                <Link to="/">5 Min</Link>
              </li>
              <li>
                <Link to="/hour">1 Hour</Link>
              </li>
              <li>
                <Link to="/day">1 Day</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="text-xl font-bold p-3 ml-[43rem]">Time Zone : {companyInfo.timeZone}</div>
      </div>
      <div className="border-b border-gray-300 mb-1"></div>
    </>
  );
}

export default Navbar;
