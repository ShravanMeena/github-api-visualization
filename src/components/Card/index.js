import React from "react";
import "../../styles/components/Card.scss";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import moment from "moment";

export default function Card({ item }) {
  const getRepoDetails = () => {
    // RepoService.get(item.owner.login, item.name).then((res) => {
    //   console.log("asdkshakjdhkusahdjg", "res");
    // });
  };

  return (
    <div className="cardContainer" onClick={getRepoDetails}>
      <div className="cardLeftItems">
        <img src={item?.owner?.avatar_url} alt="owner" />
      </div>
      <div className="cardRightItems">
        <div>
          <a
            className="h1"
            href={`https://github.com/${item.owner.login}/${item.name}`}
            alt="title"
            target="_blank"
            rel="noreferrer"
          >
            {item.name} <button>{item?.visibility?.toUpperCase()}</button>{" "}
          </a>
          <p>{item.description}</p>
        </div>

        <div className="footerCard">
          <h4>{item.language?.toUpperCase()}</h4>
          <h4>
            <span>
              <AiOutlineStar />
            </span>
            {item.stargazers_count}
          </h4>
          {item.fork && (
            <h4>
              <span>
                <AiOutlineFork />
              </span>
              <label>{item.forks_count}</label>
            </h4>
          )}
          {item.open_issues_count !== 0 && (
            <h4>{item.open_issues_count} issues need help</h4>
          )}
          <h4>
            Last pushed {moment(item?.pushed_at, "YYYYMMDD").fromNow()} by{" "}
            <a
              rel="noreferrer"
              href={`https://github.com/${item.owner.login}`}
              style={{ color: "#58a6ff" }}
              target="_blank"
            >
              {item.owner.login}
            </a>
          </h4>

          <h4>Updated {moment(item?.updated_at, "YYYYMMDD").fromNow()} </h4>
          {/* <h4>DATE OF CREATED {item?.created_at} </h4> */}
        </div>
      </div>
    </div>
  );
}
