export interface OptionData {
	key: string;
	value: string;
}

export interface OptionsAction {
	type: "options";
	payload: OptionData[];
}

export interface InputAction {
	type: "input";
	payload: string;
}

export interface SelectedAction {
	type: "selected";
	payload?: OptionData;
}

export interface MappingAction {
	type: "mapping";
	payload?: Location;
}

export type Action = OptionsAction | InputAction | SelectedAction | MappingAction;

export interface Option {
	place_id: string,
	description: string,
}

export interface Location {
	lat: number,
	lng: number,
}

export interface Props {
	input: string;
	options: OptionData[];
	tooLong: boolean;
	history: OptionData[];
	selected: OptionData;
	mapping: Location;
	handleInputChange: (v: string) => void;
	handleInputSelected: (val: string, opt: OptionData) => void;
}

export interface State {
	input: string;
	options: OptionData[];
	tooLong: boolean;
	history: OptionData[];
	selected: OptionData;
	mapping: Location;
}

export interface IMap {
	mapType: google.maps.MapTypeId;
	mapTypeControl?: boolean;
	setDistanceInKm: React.Dispatch<React.SetStateAction<number>>;
}

export interface IMarker {
	address: string;
	latitude: number;
	longitude: number;
}

export interface MapProps extends google.maps.MapOptions {
	style?: { [key: string]: string };
  children?: React.ReactNode;
}