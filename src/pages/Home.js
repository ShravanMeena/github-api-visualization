import moment from "moment";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import ResponsiveDialog from "../components/Dialogue";
import Loader from "../components/Loader";
import Header from "../components/Header/Header";

import RepoService from "../service/RepoService";
import "../styles/pages/Home.scss";
import TestingChart from "./HomeCharts.js";

export default function Home() {
  const [data, setData] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getMostStaredRepo = () => {
    let startFromStart = false;
    let q = `created:>${moment().subtract(30, "days").format()?.slice(0, 10)}`; //)
    let per_page = 100;

    if (startDate && endDate) {
      q = `created:${startDate}..${endDate}`;
      startFromStart = true;
    }

    const queryParams = {
      sort: "stars",
      order: "desc",
      q,
      page,
      per_page,
    };

    RepoService.list(queryParams).then((res) => {
      if (startFromStart) {
        setData(res.items);
        setPage(1);
      } else {
        setData([...data, ...res.items]);
        setPage(page + 1);
      }
      // stop api calling after
      if (res.items.length < per_page) {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
    getMostStaredRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = () => {
    getMostStaredRepo();
  };

  const [username, setUsername] = React.useState("");

  const getRepoData = () => {
    RepoService.get(username).then((res) => {
      setData(res);
      setHasMore(false);
      setUsername("");
    });
  };

  return (
    <>
      <Header getRepoData={getRepoData} setUsername={setUsername} />

      <div className="homeContainer">
        {/* <TestingChart /> */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            padding: "10px 50px",
          }}
        >
          <ResponsiveDialog
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            isWeekly
            fetchMoreData={fetchMoreData}
          />
          <ResponsiveDialog
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            isDays
            fetchMoreData={fetchMoreData}
          />
          <ResponsiveDialog
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            isCustomRange
            fetchMoreData={fetchMoreData}
          />
        </div>
        <InfiniteScroll
          className="infiniteBox"
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Card item={item} />
            </React.Fragment>
          ))}
        </InfiniteScroll>

        {hasMore && <Loader />}

        {/* {repoData?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Card item={item} />
          </React.Fragment>
        );
      })} */}
      </div>
    </>
  );
}
