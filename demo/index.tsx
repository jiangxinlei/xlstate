import React from "react"
import { Provider, useGloContext } from "./store";
import { render } from "react-dom";

function UserInfo() {
	const { info, dispatch, name } = useGloContext();
	console.log(name);
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
		<Provider globalVal={{ name }}>
			<UserInfo />
		</Provider>
	)
}

render(<App />, document.getElementById("root"))