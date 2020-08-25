import React from "react"
import { render } from "react-dom"

import Store from "./models/store"
import Reducer from "./models/reducer"

import PageOne from "./pages/PageOne"
import PageTwo from "./pages/PageTwo"
import PageThree from "./pages/PageThree"
import PageFour from "./pages/PageFour"

function App() {
	const name = "jxl"
	const age = 18

	return (
		<>
			<Reducer.Provider globalVal={{ age }}>
				<PageOne />

				<Store.Provider globalVal={{ age }}>
					<PageThree />
				</Store.Provider>
			</Reducer.Provider>

			<Store.Provider globalVal={{ name }}>
				<PageTwo />

				<Store.Provider globalVal={{ age }}>
					<PageFour />
				</Store.Provider>
			</Store.Provider>
		</>
	)
}

render(<App />, document.getElementById("root"))
