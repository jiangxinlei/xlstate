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

const { Provider, useGloContext } = createContainer(STATES, REDUCERS);

export {
  Provider,
  useGloContext
}




