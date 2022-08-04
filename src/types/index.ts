export interface OptionData {
	key: string;
	value: string;
}

export interface Option {

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
	payload: OptionData;
}

export type Action = OptionsAction | InputAction | SelectedAction;

export interface Option {
	place_id: string,
	description: string,
}

export interface Props {
	input: string;
	options: OptionData[];
	tooLong: boolean;
	history: OptionData[];
	selected: OptionData;
	handleInputChange: (v: string) => void;
	handleInputSelected: (val: string, opt: OptionData) => void;
}

export interface State {
	input: string;
	options: OptionData[];
	tooLong: boolean;
	history: OptionData[];
	selected: OptionData;
}
  