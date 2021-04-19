import React, { Fragment, useEffect } from "react";
import "./index.css";
import Controls from "../../components/Control";
import Main from "../../components/Main";
import axios from "axios";
import { useDispatch } from "react-redux";
const Game = () => {
  // const [state, setState] = useState(1);
  // const [state2, setState2] = useState("a");
  //didmount, didupdate , willUnmount

  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
      method: "GET",
    })
      .then((res) => {
        dispatch({ type: "FETCH_DECK_CARD", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("useEffect 2 run");
  // }, [state2]);

  return (
    <Fragment>
      {/* <button onClick={() => setState(state + 1)}>Change State</button>
      <button onClick={() => setState2(state2 + "a")}>Change State 2</button> */}
      {/* <h1> {state}</h1> */}
      <Controls />
      <Main />
    </Fragment>
  );
};

export default Game;
