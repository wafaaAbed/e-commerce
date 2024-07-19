
import ReactDOM from 'react-dom/client'
//bootsrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/global.css"
 //axios
//  import"./services/API/axios-global.js"
import AppRoutes from '@routes/AppRoutes.js';

//store
import { store } from './store';
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRoutes/>
  </Provider>

)
