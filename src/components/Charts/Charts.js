import React, { useState, useEffect, useCallback } from "react";
import { buildChart } from "../../utils";

import styles from "./Charts.module.scss";
// import sectionStyles from "../UserRepos/UserRepos.module.scss";
const Charts = ({ repoData }) => {
  // console.log(langData);
  // console.log(repoData);

  // create chart with languageData
  // create chart for most starred repos
  const [starChartData, setStarChartData] = useState(null);
  // create chart for stars per language
  // create chart for largest size distribution/repo

  // const languageChart = useCallback(() => {
  //   const canvasElement = document.getElementById("langChart");
  //   // console.log(canvasElement);
  //   // const labels = langData.map((lang) => lang.label);
  //   // const data = langData.map((lang) => lang.value);

  //   setLangChartData(data);
  //   if (data.length > 0) {
  //     // const backgroundColor = langData.map(({ color }) => color);
  //     // const borderColor = langData.map((lang) => `${lang.color}`);
  //     const chartType = "pie";
  //     const axes = false;
  //     const legend = true;
  //     const config = {
  //       canvasElement,
  //       chartType,
  //       // labels,
  //       // data,
  //       // backgroundColor,
  //       // borderColor,
  //       axes,
  //       legend,
  //     };
  //     buildChart(config);
  //   }
  // }, []);

  const mostStarredChart = useCallback(() => {
    const canvasElement = document.getElementById("starChart");
    // fetch top five repos
    const LIMIT = 10;
    const sortProperty = "stargazers_count";
    const mostStarredRepos = repoData
      .filter((repo) => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map((repo) => repo.name);
    const data = mostStarredRepos.map((repo) => repo[sortProperty]);
    // console.log({ data, labels });

    setStarChartData(data);
    if (data.length > 0) {
      const backgroundColor = "red";
      const borderColor = "green";
      const chartType = "bar";
      const axes = true;
      const legend = false;
      const config = {
        canvasElement,
        chartType,
        labels,
        data,
        backgroundColor,
        borderColor,
        axes,
        legend,
      };
      buildChart(config);
    }
  }, [repoData]);

  useEffect(() => {
    mostStarredChart();
  }, [
    // languageChart,
    mostStarredChart,
  ]);

  const secondChartError = !(starChartData && starChartData.length > 0);

  return (
    <div
      // className={sectionStyles.section}
      style={{ backgroundColor: "#2e2f34", color: "#fff" }}
    >
      <div className={styles.chartStyles}>
        <div className={styles.chart}>
          <header>
            <h2>Most Starred</h2>
          </header>
          <div className="chart_container">
            {secondChartError && <p>No data found!</p>}
            <canvas id="starChart" width={800} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
