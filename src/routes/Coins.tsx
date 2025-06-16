import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { fetchCoins } from '../api'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import { useRecoilState } from 'recoil'
import { isDarkAtom } from '../atoms'
import {HeaderContainer,ToggleButton} from '../styled/index'

const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin:0 auto;
  
`
const CoinList = styled.ul`
  
`

const Coin = styled.li`
background-color: #dcdde1;
color:#2f3640;
border-radius: 15px;
margin-bottom: 10px;
a{
  display: flex;
  align-items: center;
  padding:20px;
  transition: color 0.2s ease-in;
}
&:hover{
  a{
    color:${(props) => props.theme.accentColor}
  }
}
  
`
const Title = styled.h1`
font-size: 48px;
color:${(props) => props.theme.accentColor}; 
  
`
const Loader = styled.div`
  text-align: center;
`

const Img = styled.img`
width: 35px;
height: 35px;
margin-right: 10px;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}



const Coins = () => {

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
  
  const [isDark,setIsDark] = useRecoilState(isDarkAtom)
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <HeaderContainer>
        <Title>Coin</Title>
        <ToggleButton onClick={()=>setIsDark(!isDark)}>{isDark ? `🌞` : `🌙`}</ToggleButton>
      </HeaderContainer>
      {isLoading ? <Loader>Loading...</Loader> : <CoinList>
        {data?.slice(0, 100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={{
              pathname: `/${coin.id}`,
              state: { name: coin.name }
            }}>
              <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} />
              {coin.name} &rarr;</Link>
          </Coin>
        ))
        }
      </CoinList>}
    </Container>
  )
}

export default Coins