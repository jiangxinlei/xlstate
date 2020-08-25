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
import { createContainer } from "xlstate"
const STATES = {
  info: {
    name: "Jack",
    age: 16,
  },
}

const REDUCERS = {
  setInfo(state, { payload }) {
    return {
      ...state,
      info: {
        ...payload,
      },
    }
  },
}
// 建议在状态初始化时调用 createContainer 方法，将 Provider 和 useGloContext 输出
const { Provider, useGloContext } = createContainer(STATES, REDUCERS)

export { Provider, useGloContext }
```

```js
// 使用
import React from "react"
import { render } from "react-dom"
import { Provider, useGloContext } from "./state"

// 在自组件中调用  useGloContext 方法获取全局 context 值
function UserInfo() {
  const { info, dispatch, name } = useGloContext()
  console.log(name)
  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "setInfo",
            payload: {
              name: "Jxl",
              age: 20,
            },
          })
        }}
      >
        change info
      </button>
      <p>{name}</p>
      <p>{info.age}</p>
    </div>
  )
}

// 用 Provider 在 最外层将组件包裹
function App() {
  const name = "jxl"
  return (
    <Provider globalVal={{ name }}>
      <UserInfo />
    </Provider>
  )
}

render(<App />, document.getElementById("root"))
```

## 其他奇技用法

### 1、多 Provider

- 创建两个 reducer

```js
// models/store.js
import { createContainer } from "xlstate"
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

// models/reducer.js
import { createContainer } from "xlstate"
const STATES = {
  name: "Leon",
}

const REDUCERS = {
  setName(state, { payload }) {
    return {
      ...state,
      name: payload,
    }
  },
}

const Reducer = createContainer(STATES, REDUCERS)

export default Reducer
```

- 在入口引入

```js
// index.js
import React from "react"
import { render } from "react-dom"

import Store from "./models/store"
import Reducer from "./models/reducer"

import PageOne from "./pages/PageOne"
import PageTwo from "./pages/PageTwo"

function App() {
  const name = "jxl"
  const age = 18

  return (
    <>
      <Reducer.Provider globalVal={{ age }}>
        <PageOne />
      </Reducer.Provider>
      <Store.Provider globalVal={{ name }}>
        <PageTwo />
      </Store.Provider>
    </>
  )
}
```

分别用不同的 Provider 嵌套子组件。

- 在子组件中使用

```js
// PageOne.js
import React from "react"
import Reducer from "../models/reducer"

export default () => {
  const global = Reducer.useGloContext()
  console.log("PageOne: ", global)

  return <div>page one</div>
}

// PageTwo.js
import React from "react"
import Store from "../models/store"

export default () => {
  const global = Store.useGloContext()
  console.log("PageTwo: ", global)

  return <div>page two</div>
}
```

在子组件内可获取到对应的 state。

### 2、多 Provider + 嵌套

在上面基础上，增加 `PageThree` 组件；

- 修改入口

在 `PageThree` 外层嵌套了 `Store.Provider`

```js
// index.js
import PageOne from "./pages/PageOne"
import PageTwo from "./pages/PageTwo"
import PageThree from "./pages/PageThree"

function App() {
  const name = "jxl"
  const age = 18

  return (
    <>
      <Reducer.Provider globalVal={{ age }}>
        <PageOne />

        <Store.Provider>
          <PageThree />
        </Store.Provider>
      </Reducer.Provider>

      <Store.Provider globalVal={{ name }}>
        <PageTwo />
      </Store.Provider>
    </>
  )
}
```

如果 `Store` 和 `globalVal` 都有 `age` 属性，则默认 `globalVal` 会覆盖掉 `store` 的。

```js
// globalVal 会覆盖掉 store 的
<Store.Provider globalVal={{ age }}>
  <PageThree />
</Store.Provider>
```

- PageThree 组件使用

```js
// PageThree.js
import React from "react"

import Store from "../models/store"
import Reducer from "../models/reducer"

export default () => {
  const storeState = Store.useGloContext()
  const reducerState = Reducer.useGloContext()
  console.log("PageThreeStoreState: ", storeState)
  console.log("PageThreeReducerState: ", reducerState)

  return <div>page three</div>
}
```

`PageThree` 组件用 `Store.Provider` 包裹，父级又用 `Reducer.Provider` 包裹，在 `PageThree` 组件内部，可用不同的 reducer 获取对应的 state 状态。

- 修改 state

```js
// PageThree.js
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
```

### 3、同 Provider + 嵌套

再创建 `PageFour` 组件

- 入口添加

在 `PageFour` 外层嵌套了 `Store.Provider`，并添加 `globalVal`

```js
// index.js
import PageOne from "./pages/PageOne"
import PageTwo from "./pages/PageTwo"
import PageThree from "./pages/PageThree"

function App() {
  const name = "jxl"
  const age = 18

  return (
    <>
      <Reducer.Provider globalVal={{ age }}>
        <PageOne />

        <Store.Provider>
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
```

- `PageFour` 中使用

在 `PageFour` 外嵌套了 `Store.Provider`，外层又嵌套了 `Store.Provider`，但是在 `PageFour` 获取的是最靠近的状态。

```js
import React from "react"
import Store from "../models/store"

export default () => {
  const global = Store.useGloContext()
  console.log("PageFour: ", global)

  return <div>page one</div>
}
```

## 总结

- xlstate 可创建多个 reducer，也可嵌套多层 Provider
- globalVal 的值和 reducer 状态值相同时，globalVal 会覆盖 reducer 的
- 组件嵌套不同 Provider 时，可使用对应的 reducer 方法去获取状态
- 组件嵌套相同 Provider 时，组件内部获取的状态以最近嵌套的 Provider 为主
