# xlstate

> 参考：[unstated-next](https://github.com/jamiebuilds/unstated-next)

## 与 unstated-next 区别

- unstated-next 是基于 useContext + useState 开发；xlstate 是通过 useContext + useReducer；
- unstated-next 输出两个 api：createContainer 和 useContainer；xlstate 输出一个 api：createContainer；

## 安装

```shell
npm install --save xlstate
```

## Example

```js
// state - 创建 state 和 reducer
import { createContainer } from "../src/xlstate";
const STATES = {
  info: {
    name: 'Jack',
    age: 16
  }
};

const REDUCERS = {
  setInfo(state, { payload }) {
    return {
      ...state,
      info: {
        ...payload
      }
    };
  },
};
// 建议在状态初始化时调用 createContainer 方法，将 Provider 和 useGloContext 输出
const { Provider, useGloContext } = createContainer(STATES, REDUCERS);

export {
  Provider,
  useGloContext
}
```

```js
// 使用
import React from "react"
import { render } from "react-dom";
import { Provider, useGloContext } from "./state";

// 在自组件中调用  useGloContext 方法获取全局 context 值
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
      <p>{name}</p>
      <p>{info.age}</p>
    </div>
  )
}

// 用 Provider 在 最外层将组件包裹
function App() {
  const name = 'jxl';
  return (
    <Provider globalVal={{ name }}>
      <UserInfo />
    </Provider>
  )
}

render(<App />, document.getElementById("root"))
```
