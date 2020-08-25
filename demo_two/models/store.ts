import { createContainer } from "../../dist/xlstate"
const STATES = {
	age: 16,
}

const REDUCERS = {
	setAge(state, { payload }) {
		return {
			...state,
			age: payload,
		}
	},
}

const Store = createContainer(STATES, REDUCERS)

export default Store
