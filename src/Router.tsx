import React from 'react'
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import Coins from './routes/Coins'
import Coin from './routes/Coin'



const Router = () => {
  return (
   <BrowserRouter basename={process.env.PUBLIC_URL}>
   <Switch>
   <Route path="/:coinId">
      <Coin/>
    </Route>
    <Route path="/">
      <Coins />
    </Route>
   </Switch>
   </BrowserRouter>
  )
}

export default Router