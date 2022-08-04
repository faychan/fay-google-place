import React, { Dispatch } from "react";

import { Action, State, Props, OptionData } from "./types";
import { connect } from "react-redux";
import { AutoComplete, Card } from "antd";
import "antd/dist/antd.min.css";

const Input: React.FC<Props> = props => {
  return (
    <div>
      <AutoComplete
        id="search"
        value={props.input}
        options={props.options}
        onChange={props.handleInputChange}
        onSelect={(val: string, opt: OptionData) => props.handleInputSelected(val, opt)}
        placeholder="input place name"
        style={{ width: "100%" }}
        size="large"
      />
      <Card style={{ width: "300px", marginTop: "16px"}}>
        History Search:
        <ol>
          {
            props.history.map( hs => {
              return <li>{hs.value}</li>
            })
          }
        </ol>
      </Card>
    </div>
  );
};

const mapStateToProps = (
  state: State
): { [K in "input" | "tooLong" | "options" | "history" | "selected" ]: Props[K] } => {
  return state;
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    handleInputChange: (val: string) => {
      dispatch({ type: "input", payload: val });
    },
    handleInputSelected: (val: string, opt: OptionData) => {
      dispatch({ type: "selected", payload: opt });
    }
  };
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
