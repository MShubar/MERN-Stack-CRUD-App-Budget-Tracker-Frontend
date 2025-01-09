import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart } from '@mui/x-charts/PieChart'
import { BarChart } from '@mui/x-charts/BarChart'
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { Link } from 'react-router'

const getMonthlyTransactionData = (transactions) => {
  const monthlyData = Array(12).fill(0)
  const monthlyDebitedData = Array(12).fill(0)
  const monthlyCreditedData = Array(12).fill(0)

  transactions.forEach((transaction) => {
    const monthIndex = new Date(transaction.date).getMonth()
    if (transaction.type === 'Debit') {
      monthlyCreditedData[monthIndex] += transaction.amount
    } else if (transaction.type === 'Credit') {
      monthlyDebitedData[monthIndex] += transaction.amount
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

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  // State to track when each section is in view
  const [inView, setInView] = useState({
    pieChart: false,
    barChart: false,
    transactionList: false
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            setInView((prevState) => ({
              ...prevState,
              [id]: true
            }))
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Box sx={{ padding: 3, minHeight: '100vh' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}
            className="section"
            id="pieChart"
          >
            {inView.pieChart && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to="/categorylist"
                  >
                    Category Distribution
                  </Link>
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
                  height={400}
                  style={{ borderRadius: '8px' }}
                />
              </motion.div>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}
            className="section"
            id="barChart"
          >
            {inView.barChart && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to="/transaction/list"
                  >
                    Monthly Net Spent
                  </Link>
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
                      label: 'Monthly Spending'
                    }
                  ]}
                  width={500}
                  height={400}
                  style={{ borderRadius: '8px' }}
                />
              </motion.div>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        Latest Transactions
      </Typography>
      <Paper
        sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}
        className="section"
        id="transactionList"
      >
        {inView.transactionList && (
          <Box
            sx={{
              maxHeight: '400px',
              overflowY: 'auto',
              paddingRight: 1
            }}
          >
            <List>
              {sortedTransactions.map((transaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 1, delay: index * 0.7 }}
                >
                  <ListItem>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 'bold',
                              color:
                                transaction.type === 'Debit' ? 'red' : 'green'
                            }}
                          >
                            {transaction.type === 'Debit' ? '-' : '+'}{' '}
                            {transaction.amount}
                          </Typography>{' '}
                          <Typography component="span" sx={{ color: 'gray' }}>
                            (Category: {transaction.name})
                          </Typography>
                        </>
                      }
                      secondary={`Date: ${new Date(
                        transaction.date
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default Dashboard
