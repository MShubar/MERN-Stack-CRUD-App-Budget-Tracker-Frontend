import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { Grid, Paper, Typography, Box } from '@mui/material'

const getMonthlyTransactionData = (transactions) => {
  const monthlyData = Array(12).fill(0)
  const monthlyDebitedData = Array(12).fill(0)
  const monthlyCreditedData = Array(12).fill(0)

  transactions.forEach((transaction) => {
    const monthIndex = new Date(transaction.date).getMonth()
    if (transaction.type === 'Debit') {
      monthlyDebitedData[monthIndex] += transaction.amount
    } else if (transaction.type === 'Credit') {
      monthlyCreditedData[monthIndex] += transaction.amount
    }
  })

  for (let i = 0; i < 12; i++) {
    monthlyData[i] = monthlyCreditedData[i] - monthlyDebitedData[i]
  }

  return { monthlyData, monthlyDebitedData, monthlyCreditedData }
}

const getCategoryDistribution = (transactions) => {
  const categoryMap = {}

  transactions.forEach((transaction) => {
    const category = transaction.category
    if (categoryMap[category]) {
      categoryMap[category] += transaction.amount
    } else {
      categoryMap[category] = transaction.amount
    }
  })

  return Object.keys(categoryMap).map((category) => ({
    label: category,
    value: categoryMap[category]
  }))
}

const Dashboard = ({ transactions }) => {
  const { monthlyData, monthlyDebitedData, monthlyCreditedData } =
    getMonthlyTransactionData(transactions)
  const categoryDistribution = getCategoryDistribution(transactions)

  return (
    <Box sx={{ padding: 3, minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Category Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: categoryDistribution,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: 'gray'
                  }
                }
              ]}
              height={300}
              style={{ borderRadius: '8px' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Monthly Net Balance
            </Typography>
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                  ]
                }
              ]}
              series={[
                {
                  data: monthlyData,
                  label: 'Monthly Balance'
                }
              ]}
              width={500}
              height={300}
              style={{ borderRadius: '8px' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
