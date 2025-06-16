import React from 'react'
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Price from './Price';
import Chart from './Chart';
import { fetchCoinInfo, fetchCoinTicker } from '../api';
import { useQuery } from 'react-query';
import {Helmet} from 'react-helmet'
import { GoHomeFill } from "react-icons/go";
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
import { HeaderContainer, ToggleButton } from '../styled/index';



const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;



interface RouteParams {
  coinId:string;
}
interface RouteState {
  name:string;
}

interface InfoData {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  is_new:boolean;
  is_active:boolean;
  type:string;
  logo:string;
  description:string;
  message:string;
  open_source:boolean;
  started_at:string;
  development_status:string;
  hardware_wallet:boolean;
  proof_type:string;
  org_structure:string;
  hash_algorithm:string;
  first_data_at:string;
  last_data_at:string;
}
interface PriceData {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  circulating_supply:number;
  total_supply:number;
  max_supply:number;
  beta_value:number;
  first_data_at:string;
  last_updated:string;
  quotes:{
    USD:{
      ath_date : string;
      ath_price : number;
      market_cap : number;
      market_cap_change_24h : number;
      percent_change_1h : number;
      percent_change_1y : number;
      percent_change_6h : number;
      percent_change_7d : number;
      percent_change_12h : number;
      percent_change_15m : number;
      percent_change_24h : number;
      percent_change_30d : number;
      percent_change_30m : number;
      percent_from_price_ath : number;
      price : number;
      volume_24h : number;
      volume_24h_change_24h : number;
    }
  };
} 


const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.3);
  padding: 10px 20px;
  border-radius: 10px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child{
    font-size:10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Description = styled.p`
  margin:20px 0px;
`
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin:25px 0px;
  gap:10px;
`
const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props =>props.isActive?props.theme.accentColor:"rgba(0,0,0,0.3)"};;
  border-radius: 10px;
  color: ${props =>props.theme.textColor};
  a{
    padding: 7px 0px;
    display: block;
  }

`
const Home = styled.div`
position:absolute;
top:10px;
left: 0;
padding: 15px;
font-size: 30px;
`



const Coin = () => {
  
  const [isDark,setIsDark] = useRecoilState(isDarkAtom)
  const {coinId} = useParams<RouteParams>();
  const {state} = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price")
  const chartMatch = useRouteMatch("/:coinId/chart")

  const {isLoading:infoLoading,data:infoData}=useQuery<InfoData>(["info",coinId],()=>fetchCoinInfo(coinId))
  const {isLoading:tickerLoading,data:tickerData}=useQuery<PriceData>(
    ["ticker",coinId],()=>fetchCoinTicker(coinId),
  // {
  //   refetchInterval: (_, query) => {
  //     return query.state.dataUpdateCount < 5 ? 5000 : false 
  //   }
  // }
)


  const loading = infoLoading || tickerLoading

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
  
      <Home >
        <Link to={"/"}>
          <GoHomeFill/>
        </Link>
      </Home>
      <HeaderContainer>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <ToggleButton onClick={()=>setIsDark(!isDark)}>{isDark ? `🌞` : `🌙`}</ToggleButton >
      </HeaderContainer>
     
      {loading ? <Loader>Loading...</Loader> : (
        <>
   
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{tickerData?.quotes?.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>
            {infoData?.description}
          </Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null || (!chartMatch && !priceMatch)}>
              <Link to={`/${coinId}/chart`}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>
                Today Price
              </Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId}/>
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId}/>
            </Route>
            <Route path={`/:coinId`}>
              <Chart coinId={coinId}/>
            </Route>
          </Switch>
        </>
      )}
    </Container>

  )
}

export default Coin