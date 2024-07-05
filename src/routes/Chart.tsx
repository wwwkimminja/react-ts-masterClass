import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts'

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
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
  return (
    <div>{isLoading ? "Loading chart..." :
      <ApexCharts
        type="line"
        series={[
          {
            name: "price",
            data: data?.map(v => ({
              x:new Date(v.time_close*1000),
              y:Number(v.close)
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
              toolbar:{
                show:false
              },
              background:"transparent"
            },
            grid:{
              show:false
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
              type:"datetime",

            },
            fill:{
              type:"gradient",
              gradient:{gradientToColors:["#0be881"],stops:[0,100]}
            },
            colors:["#0fbcf9"],
            tooltip:{
              y:{
                formatter:(value)=>`${value.toFixed(2)}`
              },
            }
          }
        } />
    }</div>
  )
}

export default Chart