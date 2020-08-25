import { createContainer } from "../../dist/xlstate"
const STATES = {
	name: "Leon",
}

const REDUCERS = {
	setName(state, { payload }) {
		return {
			...state,
			name: payload,
		}
	},
}

const Reducer = createContainer(STATES, REDUCERS)

export default Reducer
