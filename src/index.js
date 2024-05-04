import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./Store/Store"

import App from './Components/App'
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>
)
