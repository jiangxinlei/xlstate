import React from "react"

import Store from "../models/store"

export default () => {
	const global = Store.useGloContext()
	console.log("PageFour: ", global)

	return <div>page one</div>
}
