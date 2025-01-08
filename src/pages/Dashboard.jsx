import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
const Dashboard = ({ transaction, categories, budget }) => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'category1' },
                { id: 1, value: 15, label: 'category2' },
                { id: 2, value: 20, label: 'category3' }
              ],
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
            }
          ]}
          height={200}
        />
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June']
            }
          ]}
          series={[
            { data: [4, 3, 5, 3, 4, 5, 6] },
            { data: [1, 6, 3, 5, 6, 7, 3] },
            { data: [2, 5, 6, 3, 5, 7, 5] },
            { data: [4, 3, 5, 3, 4, 5, 6] },
            { data: [1, 6, 3, 5, 6, 7, 3] },
            { data: [2, 5, 6, 3, 5, 7, 5] }
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  )
}
export default Dashboard
