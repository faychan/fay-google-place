import React, { Dispatch, useCallback, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { connect } from "react-redux";
import { AutoComplete, Card } from "antd";

import { Action, State, Props, OptionData } from "./types";
import "antd/dist/antd.min.css";
import mapStyle from "./style/mapStyle";

const Input: React.FC<Props> = props => {

  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);


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
              return <li>{hs?.value}</li>
            })
          }
        </ol>
      </Card>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={props.mapping}
        options={options}
        onLoad={onMapLoad}
      >
        <MarkerF position={props.mapping} />
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (
  state: State
): { [K in "input" | "tooLong" | "options" | "history" | "selected" | "mapping" ]: Props[K] } => {
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
