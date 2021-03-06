import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
} from 'recharts'
import Title from '../Title'

// BAR CHART COLORS
const barFillColor = '#F3E723'

function DailyUV({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          uv: Number(day.uvIndex),
        },
      ])
    })
  }, [weather.daily.data])

  return (
    <>
      <Title>UV Index</Title>
      <ResponsiveContainer minHeight='200px'>
        <BarChart
          data={chartData}
          syncId='synced'
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis dataKey='weekday' />
          <YAxis tickSize={1} unit='/10' domain={[0, 10]} />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar dataKey='uv' fill={barFillColor} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(DailyUV)
