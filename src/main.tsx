import { createRoot } from 'react-dom/client';
import './assets/styles/_main.scss';
import {Provider} from 'react-redux';
import {store} from './store/store.js';
import {router} from "./router/router.js";
import {RouterProvider} from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
