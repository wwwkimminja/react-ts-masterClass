import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import styled from 'styled-components';

interface PriceProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const List = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const ItemContainer = styled.li`
padding: 10px;
display: flex;
justify-content: space-between;
width: 50%;

`
const Label = styled.div`
text-transform: capitalize;
width: 30%;

`


interface ItemProps {
  label:string;
  price:string;
}


function Item({label, price}:ItemProps){
  return (
    <ItemContainer>
      <Label>{label}</Label>:
      <div>$ {price}</div>
    </ItemContainer>
  )

}

function Price({coinId}:PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId], () => fetchCoinHistory(coinId),
  )

 
  
  return (
    <div>{isLoading ? "Loading chart..." :data?
      <List>
        <Item label="open" price={data[20].open}/>
        <Item label="high" price={data[20].high}/>
        <Item label="low" price={data[20].low}/>
        <Item label="close" price={data[20].close}/>
      </List>:undefined
      }</div>
  )
}

export default Price