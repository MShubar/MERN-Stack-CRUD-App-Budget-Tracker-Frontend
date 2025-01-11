import React from 'react'
import '../Home.css' // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Take Control of Your Finances: Simplify, Track, and Thrive!</h1>
        <p>
          Welcome to our Budget Tracker system, your ultimate tool for managing
          personal finances effortlessly. Designed for users of all levels, our
          platform provides intuitive features that empower you to track
          spending, set savings goals, and gain insights into your financial
          habits. With our Budget Tracker, achieving financial freedom has never
          been easier!
        </p>
      </section>
      <section className="features">
        <h2>
          How Budget Tracker Will Help You Organize Your Personal Finances
        </h2>
        <p>
          Our Budget Tracker is here to help you make informed financial
          decisions. By providing a clear overview of your income and expenses,
          you can identify spending patterns, prioritize savings, and avoid
          unnecessary debt. Whether you're planning for a special purchase or
          aiming to build an emergency fund, our system equips you with the
          tools you need to stay on track and meet your financial goals.
        </p>
      </section>
      <section className="modules">
        <h2>Budget Tracker Modules</h2>
        <div className="module">
          <h3>Budget</h3>
          <p>
            Set and manage budgets for different expense categories. Allocate
            funds for essentials and discretionary spending, and monitor your
            progress in real-time.
          </p>
        </div>
        <div className="module">
          <h3>Transactions</h3>
          <p>
            Easily record and categorize transactions to keep a detailed account
            of your spending habits. Quick entry options help you stay on top of
            your finances without hassle.
          </p>
        </div>
        <div className="module">
          <h3>Categories</h3>
          <p>
            Organize your expenses into customizable categories. This feature
            helps you see where your money is going and allows for better
            budgeting strategies.
          </p>
        </div>
        <div className="module">
          <h3>Calendar</h3>
          <p>
            Visualize your financial activities with our calendar module. Track
            upcoming bills, payment due dates, and financial milestones to
            ensure you never miss a deadline.
          </p>
        </div>
        <div className="module">
          <h3>Reports</h3>
          <p>
            Generate insightful reports that provide a comprehensive view of
            your financial health. Analyze trends, track your spending over
            time, and make data-driven decisions.
          </p>
        </div>
        <div className="module">
          <h3>Notifications</h3>
          <p>
            Stay informed with timely notifications for bill reminders, budget
            limits, and spending alerts. Our notification system ensures you
            remain proactive in managing your finances.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
