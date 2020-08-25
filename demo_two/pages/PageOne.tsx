import React from "react"

import Reducer from "../models/reducer"

export default () => {
	const global = Reducer.useGloContext()
	console.log("PageOne: ", global)

	return <div>page one</div>
}
