import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const query = location?.search?.slice(3);

  const fetchData = async () => {
    try {
      const response = await axios.get("search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if(query){
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("location", location.search.slice(3));

  return (
    <div className="pt-16">
      <div className="sticky top-0 z-40 mx-1 my-2 lg:hidden">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="w-full px-4 py-1 text-lg bg-white rounded-full text-neutral-900 "
          value = {query?.split("%20")?.join(" ")}
        />
      </div>
      <div className="container mx-auto text-center">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          {" "}
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 justify-items-center lg:justify-start">
          {data.map((searchData, index) => (
            <Card
              data={searchData}
              key={`${searchData.id}-search-${index}`} // Unique key by combining id, "search", and index
              media_type={searchData.media_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
