import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts'
import dayjs from 'dayjs';

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId], () => fetchCoinHistory(coinId),
    // {
    //   refetchInterval: 5000
    // }
  )
  return (
    <div>{isLoading ? "Loading chart..." :
      <ApexCharts
        type="candlestick" 
        series={[
          {
            name: 'candle',
            data: data?.map(v => ({
              x:new Date(v.time_open),
              y:[Number(v.open),Number(v.high),Number(v.low),Number(v.close)]
            })
            )||[]
          }
        ]}
        options={
          {
            theme: {
              mode: "dark"
            },
            chart: {
              height: 500,
              width: 500,
              type:'candlestick',
              toolbar:{
                show:false
              },
              background:"transparent"
            },
            grid:{
              show:false
            },
            stroke:{
              width:1
            },
            yaxis:{
              show:false
            },
            xaxis:{
              labels:{show:false},
              axisTicks:{
                show:false
              },
              axisBorder:{
                show:false
              },
              type: 'datetime'

            },
            // fill:{
            //   type:"gradient",
            //   gradient:{gradientToColors:["#0be881"],stops:[0,100]}
            // },
            // colors:["#0fbcf9"],
            tooltip:{
              y:{
                formatter:(value)=>`${value.toFixed(2)}`
                
              },
              x:{
                formatter:(value)=>dayjs(value).format('MMM DD HH:mm')
              }
            }
          }
        } />
    }</div>
  )
}

export default Chart