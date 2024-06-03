import Routes from "./routes"
import {QueryClient,  QueryClientProvider} from 'react-query'
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AuthProvider from "./Providers/AuthProvider";
import ViewProvider from "./Providers/OverViewProvider";

function App() {

  /* const configQueryClient:QueryClientConfig= {
    defaultOptions:{
      queries:{
        retry:5
      }

    }
  } */
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <AuthProvider>
              <ViewProvider>

                 <Routes/>
              </ViewProvider>
              </AuthProvider>
    </LocalizationProvider>
    </QueryClientProvider>
  
  )
}

export default App
