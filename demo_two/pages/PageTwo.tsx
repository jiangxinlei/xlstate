import React from "react"
import Store from "../models/store"

export default () => {
	const global = Store.useGloContext()
	console.log("PageTwo: ", global)

	return <div>page two</div>
}
