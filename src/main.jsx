//  import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(


  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      dialogProps:{ maxWidth:'xs' },
      confirmationText:'Confirm',
      cancellationText:'Cancel'
    }}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer position='bottom-right'/>
    </ConfirmProvider>
  </CssVarsProvider>

)
