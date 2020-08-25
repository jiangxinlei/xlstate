import React from "react"
import { render } from "react-dom"

import Store from "./models/store"

function Demo() {
	const glostate = Store.useGloContext()
	console.log(glostate)

	return <>{glostate.name}</>
}

function App() {
	const name = "jxl"

	return (
		<Store.Provider globalVal={{ name }}>
			<Demo />
		</Store.Provider>
	)
}

render(<App />, document.getElementById("root"))
