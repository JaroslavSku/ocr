import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { reducer as modal } from "redux-modal"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import { combineReducers, compose, applyMiddleware, createStore } from "redux"
import menuReducer from "./store/reducers/menuReducer"
import thunk from "redux-thunk"
import componentReducer from "./store/reducers/componentReducer"
import drawedObjectsReducer from "./store/reducers/drawedObjectsReducers"
import formDataReducer from "./store/reducers/formDataReducer"

const rootReducer = combineReducers({
  menu: menuReducer,
  components: componentReducer,
  draw: drawedObjectsReducer,
  form: formDataReducer,
  modal,
})

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("graph")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
