import React, { useState, useEffect } from "react";
import './App.css';

let pageIndex = 1;
const App = () => {

  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalDataCount, setTotalDataCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [itemsPerPage, setitemPerPage] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    generateData(pageIndex);
  },[]);

  const generateData = (page: number) => {
    fetch('https://reqres.in/api/users?page='+ page, {

    })
    .then((res) => res.json())
    .then((data) =>{
      console.log(data);
      setitemPerPage(data.per_page)
      setTotalDataCount(data.total);
      setTotalPages(data.total_pages);
      setData((appData: any) => [...appData, ...data.data]);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false)
      console.log('Error: ' +err)
    })
  }

  const loadMoreData = () => {
    if (pageIndex >= totalPages) {
      setHasMore(false);
      setLoading(false);
      return;
    }
      pageIndex = pageIndex + 1;
      generateData(pageIndex)

  };

  const handleScroll = () => {
    setLoading(true);
    setTimeout(() => {
    loadMoreData();
    }, 2000);
  }

  return (
    <div className="container" onScroll={handleScroll}>
      <div className="row">
      {data.map((item : any, index: number) => (
        <div className="col-3 content mx-1" key={index}>
          
          <img src={item?.avatar} className="img rounded float-start" />
          <p className="text-center">{item.first_name}</p>
          <p className="text-center">{item.last_name}</p>
          <p className="text-center email">{item.email}</p>
        </div>
      ))}
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {/* {!hasMore && (
        <p style={{ textAlign: "center" }}>You have reached the end!</p>
      )} */}
    </div>
  );
};

export default App;