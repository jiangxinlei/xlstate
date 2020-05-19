import React from "react"
import { Provider, useGloContext } from "./state";
import { render } from "react-dom";

function UserInfo() {
	const global = useGloContext();
	const { info, dispatch } = global;
	console.log(global);
 	return (
		<div>
			<button onClick={() => {
				dispatch({
					type: 'setInfo',
					payload: {
						name: 'Jxl',
						age: 20
					}
				})
			}}>change info</button>
			<p>{info.name}</p>
			<p>{info.age}</p>
		</div>
	)
}

function App() {
	const name = 'jxl';
	return (
		<Provider globalVal={name}>
			<UserInfo />
		</Provider>
	)
}

render(<App />, document.getElementById("root"))