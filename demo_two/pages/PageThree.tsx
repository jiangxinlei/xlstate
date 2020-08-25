import React from "react"

import Store from "../models/store"
import Reducer from "../models/reducer"

export default () => {
	const storeState = Store.useGloContext()
	const reducerState = Reducer.useGloContext()
	console.log("PageThreeStoreState: ", storeState)
	console.log("PageThreeReducerState: ", reducerState)

	const { dispatch } = storeState

	return (
		<>
			<div>page three</div>
			<button
				onClick={() => {
					dispatch({
						type: "setAge",
						payload: 100,
					})
				}}
			>
				改状态
			</button>
		</>
	)
}
