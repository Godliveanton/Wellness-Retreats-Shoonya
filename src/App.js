import React, { useEffect, useState } from "react";
import Card from "./components/Card.jsx";
import "./App.scss";
import { searchRetreat, filterType, getRetreats } from "./routes.js";

function App() {
  const [state, setState] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState("");
  const [opertaion, setOperation] = useState("all");
  const [fType, setFType] = useState("def");
  const [error, setError] = useState("");
  useEffect(() => {
    const func = async () => {
      const data = await getRetreats(1);
      setState(data);
    };
    func();
  }, []);

  const selectChange = async (e) => {
    const word = e.target.value;
    if (word !== "def") {
      const data = await filterType(word, 1);
      setState(data);
      setFType(word);
      setOperation("filter");
      setPageNum(1);
    }
  };

  const onSearch = async (e) => {
    if (e.key === "Enter" && search !== "") {
      const data = await searchRetreat(search, 1);
      if (data === "Not Found") {
        setError(data);
      } else {
        setState(data);
        setOperation("search");
        setPageNum(1);
      }
    }
  };

  const opertaionDecider = async (buttonPressed) => {
    const page = buttonPressed === "Prev" ? pageNum - 1 : pageNum + 1;

    if (opertaion === "search") {
      const data = await searchRetreat(search, page);
      if (data.length > 0) {
        setState(data);
        setPageNum(page);
      }
    } else if (opertaion === "filter") {
      const data = await filterType(fType, page);
      if (data.length > 0) {
        setState(data);
        setPageNum(page);
      }
    }
  };

  const prevPage = async () => {
    opertaionDecider("Prev");
  };

  const nextPage = async () => {
    opertaionDecider("Next");
  };
  return (
    <div className="app">
      <nav className="nav-heading">Wellness Retreats</nav>
      <div className="hero">
        <img src={require("./assets/yoga.jpeg")} alt="" />
        <h3>Discover Your Inner Peace</h3>
        <p>
          Join us for a series of wellness retreats designed to help you find
          tranquility and rejuventaion.
        </p>
      </div>
      <div className="filterTab">
        <select
          className="filterType"
          name="type"
          id="type"
          onChange={selectChange}
        >
          <option value="def">Filter By Type</option>
          <option value="yoga">Yoga</option>
          <option value="Meditation">Meditation</option>
          <option value="Detox">Detox</option>
        </select>
        <select className="filterType" name="date" id="date">
          <option value="def">Filter By Date</option>
          <option value="2k">2023</option>
        </select>
        <input
          type="search"
          name="retreat"
          id="retreat"
          placeholder="Search Retreats by Name"
          className="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onSearch}
        />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="card-data">
          {state.map((val) => {
            return (
              <Card
                key={val.id}
                img={val.image}
                title={val.title}
                description={val.description}
                date={val.date}
                location={val.location}
                price={val.price}
                duration={val.duration}
              />
            );
          })}
        </div>
      )}
      <div className="buttonContainer">
        <button
          className="buttonPrev"
          disabled={pageNum === 1}
          onClick={prevPage}
        >
          Previous
        </button>
        <button className="buttonNext" onClick={nextPage}>
          Next
        </button>
      </div>
      <footer>
        <p>© 2024 Wellness Retreats. All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
