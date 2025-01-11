import React from 'react'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="container my-5">
      <section className="text-center mb-7">
        <motion.h1
          className="display-4 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Take Control of Your Finances: Simplify, Track, and Thrive!
        </motion.h1>
        <motion.p
          className="lead mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to our Budget Tracker system, your ultimate tool for managing
          personal finances effortlessly. Designed for users of all levels, our
          platform provides intuitive features that empower you to track
          spending, set savings goals, and gain insights into your financial
          habits. With our Budget Tracker, achieving financial freedom has never
          been easier!
        </motion.p>
      </section>

      <section className="mb-7">
        <motion.h2
          className="h3 text-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          How Budget Tracker Will Help You Organize Your Personal Finances
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mb-5"
        >
          Our Budget Tracker is here to help you make informed financial
          decisions. By providing a clear overview of your income and expenses,
          you can identify spending patterns, prioritize savings, and avoid
          unnecessary debt. Whether you're planning for a special purchase or
          aiming to build an emergency fund, our system equips you with the
          tools you need to stay on track and meet your financial goals.
        </motion.p>
      </section>

      <section className="mb-7">
        <motion.h2
          className="h3 text-center mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Budget Tracker Modules
        </motion.h2>
        <div className="row">
          <div className="col-md-4 mb-5">
            <motion.div
              className="card shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="card-body">
                <h5 className="card-title">Budget</h5>
                <p className="card-text">
                  Set and manage budgets for different expense categories.
                  Allocate funds for essentials and discretionary spending, and
                  monitor your progress in real-time.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4 mb-5">
            <motion.div
              className="card shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="card-body">
                <h5 className="card-title">Transactions</h5>
                <p className="card-text">
                  Easily record and categorize transactions to keep a detailed
                  account of your spending habits. Quick entry options help you
                  stay on top of your finances without hassle.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4 mb-5">
            <motion.div
              className="card shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
                <p className="card-text">
                  Organize your expenses into customizable categories. This
                  feature helps you see where your money is going and allows for
                  better budgeting strategies.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4 mb-5">
            <motion.div
              className="card shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <div className="card-body">
                <h5 className="card-title">Calendar</h5>
                <p className="card-text">
                  Visualize your financial activities with our calendar module.
                  Track upcoming bills, payment due dates, and financial
                  milestones to ensure you never miss a deadline.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4 mb-5">
            <motion.div
              className="card shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <div className="card-body">
                <h5 className="card-title">Reports</h5>
                <p className="card-text">
                  Generate insightful reports that provide a comprehensive view
                  of your financial health. Analyze trends, track your spending
                  over time, and make data-driven decisions.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4 mb-5">
            <motion.div
              className="card shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <div className="card-body">
                <h5 className="card-title">Notifications</h5>
                <p className="card-text">
                  Stay informed with timely notifications for bill reminders,
                  budget limits, and spending alerts. Our notification system
                  ensures you remain proactive in managing your finances.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
