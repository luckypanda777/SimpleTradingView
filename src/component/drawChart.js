import React, { useState, useEffect } from 'react'
import TradeChart from './tradechart';

import './index.css'

const url = 'https://cnft-predator.herokuapp.com/get-candlesticks'

const DrawChart = ({
  policyId
}) => {

  const [cPeriod, setCPeriod] = useState('1y')
  const [cIntervalInMilliseconds, setCIntervalInMilliseconds] = useState(1 * 60 * 60 * 1000)
  const [cPolicyId, setCPolicyId] = useState(policyId)

  const [series, setSeries] = useState([])
  const [volumes, setVolumens] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function func() {
      const res = await fetch(`${url}?policyId=${policyId}&period=${cPeriod}&intervalInMilliseconds=${cIntervalInMilliseconds}`)      
      // console.log(await res.json())
      const data = await res.json()
      const serie = data.candlesticks.map(ele => {
        return {
          time: ele.time / 1000,
          open: ele.open,
          high: ele.high,
          low: ele.low,
          close: ele.close,
        }
      })
      console.log(serie)
      setSeries(serie)
      const vol = data.candlesticks.map(ele => {
        return {
          time: ele.time / 1000,
          value: ele.intervalVolume
        }
      })
      setVolumens(vol)
      setLoading(false)
    }
    func()
  }, [cPeriod, cIntervalInMilliseconds, cPolicyId])

  return (
    <div className='drawchart'>
      <div className='drawchart-header'>
        <input 
          style={{ margin: '0px 10px' }}
          className='drawchart-input'
          id="drawchart-policyId" 
          value={cPolicyId} 
          onChange={(e) => { setCPolicyId(e.target.value) }}
        />
        <select 
          style={{ margin: '0px 10px' }}
          id="drawchart-period" 
          value={cPeriod} 
          defaultValue={'1y'}
          onChange={(e) => { setCPeriod(e.target.value) }}
        >
          <option value={'1d'}> 1d </option>
          <option value={'7w'}> 7w </option>
          <option value={'1m'}> 1m </option>
          <option value={'3m'}> 3m </option>
          <option value={'1y'}> 1y </option>
        </select>
        <select 
          style={{ margin: '0px 10px' }}
          id="drawchart-intervalmili" 
          value={cIntervalInMilliseconds}
          defaultValue={1 * 60 * 60 * 1000}
          onChange={(e) => { setCIntervalInMilliseconds((e.target.value)) }}
        >
          <option value={10 * 60 * 1000}> 10 minutes </option>
          <option value={30 * 60 * 1000}> 30 minutes </option>
          <option value={1 * 60 * 60 * 1000}> 1 hour </option>
          <option value={3 * 60 * 60 * 1000}> 3 hour </option>
          <option value={24 * 60 * 60 * 1000}> 1 day </option>
          <option value={3 * 24 * 60 * 60 * 1000}> 3 day </option>
        </select>

      </div>
      <div className='drawchart-container'>
        {
          loading ?
          <div> Loading... </div>
          :
          <TradeChart 
            series={series}
            volumes={volumes}
          />
        }
      </div>
    </div>
  )
}

export default DrawChart;