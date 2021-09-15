import ReactDOM from 'react-dom';
import App from './App';
import '@fontsource/glory';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { MaterialUITheme } from './MaterialUITheme';

ReactDOM.render(
  <Provider store={store}>
    <MaterialUITheme>
      <App />
    </MaterialUITheme>
  </Provider>,
  document.getElementById('root')
);
