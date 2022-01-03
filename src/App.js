import { useRef, useState } from "react";
import "./App.css";
import getDaysCommitted from "./getDaysCommited";
import Podium from "./Podium";
import LoaderSVG from "./LoaderSVG";

function App() {
  const [isReady, setReady] = useState(false);
  const [days, setDays] = useState([]);
  const [currentUser, setCurrentUser] = useState("defunkt");
  const inputRef = useRef(null);
  const [isFirst, setIsFirst] = useState(true);
  return (
    <div className="App">
      <h1>What are your busiest days?</h1>
      <div>
        <input placeholder="username (default: defunkt)" ref={inputRef}></input>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            const user = inputRef.current.value;
            if (user !== currentUser && (isFirst || isReady)) {
              setCurrentUser(user);
              setReady(false);
              if (isFirst) setIsFirst(false);
              getDaysCommitted(user ? user : undefined).then((days) => {
                setDays(days);
                setReady(true);
              });
            }
          }}
        >
          Get Commits
        </button>
      </div>
      <div style={{ width: "100%", height: "80vh" }}>
        {isReady ? (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Podium days={days} />
          </div>
        ) : isFirst ? (
          ""
        ) : (
          <LoaderSVG />
        )}
      </div>
    </div>
  );
}

export default App;
