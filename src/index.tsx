import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { store } from './redux/store';

ReactDOM.render(
 
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
 ,
  document.getElementById('root')
)
