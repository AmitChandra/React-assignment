import React, { useState, useEffect } from "react";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { fetchUsers } from "./features/userService";

const App : React.FC = () => {

  const [pageIndex, setpageIndex] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, total_pages} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (pageIndex <= total_pages) {
      dispatch(fetchUsers(pageIndex))
    }
  },[pageIndex]);

  const loadMoreData = () => {
     setpageIndex(pageIndex + 1);
  };

  const handleScroll = () => {
    loadMoreData();
  }

  return (
    <div className="container" onScroll={handleScroll}>
      <div className="row">
      {users.map((item : any, index: number) => (
        <div className="col-3 content mx-1" key={index}>
          
          <img src={item?.avatar} className="img rounded float-start" />
          <p className="text-center">{item.first_name}</p>
          <p className="text-center">{item.last_name}</p>
          <p className="text-center email">{item.email}</p>
        </div>
      ))}
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;