import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Graph from './Graph';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import {RevenueCard} from './RevenueCard';
import {BestSellerCard} from './BestSellerCard';
import { useTheme } from '@material-ui/core/styles';
import { ArgumentAxis, ValueAxis, Chart,  BarSeries,} from '@devexpress/dx-react-chart-material-ui';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1,
    },
    appBar: {
        borderRadius: "20px",
        backgroundColor: "#0d47a1",
        color: "white",
        
    },
    grid:{
        display:"inline-flex",
        

    },
    data: {
        margin: "7px",
        paddingTop:"20px",
        width:"350px",
        height:"200px",
        textAlign:"center",
        borderRadius: "20px",
       
    },
    bestSeller: {
        margin: "7px",
        paddingTop:"20px",
        width:"330px",
        height:"250px",
        textAlign:"center",
        borderRadius: "20px",
       
    },
    graphs:{
        display:"inline-flex",
    },
    paper: {
        borderRadius: "20px",
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    comp:{
        width:"300px"
    },
    graph:{
        width:"515px",
        padding:"10px",
        height:"250px",
        margin:"5px",
        borderRadius:"20px"
    },
    barGraph:{
        width:"500px",
        height:"550px",
        margin: "7px",
    }
}));
function weekOrder(day, orders) {
    return { day, orders };
  }

const weeklyOrder = [
    weekOrder('Sun', 49),
    weekOrder('Mon', 3),
    weekOrder('Tue', 21),
    weekOrder('Wed',34),
    weekOrder('Thur', 32),
    weekOrder('Fri', 50),
    weekOrder('Sat', 55),
  
  ];

  function weekRevenue(day, revenue) {
    return { day, revenue };
  }

const weeklyRevenue = [
    weekRevenue('Sun', 1200),
    weekRevenue('Mon', 200),
    weekRevenue('Tue', 700),
    weekRevenue('Wed',567),
    weekRevenue('Thur', 829),
    weekRevenue('Fri', 900),
    weekRevenue('Sat', 1300),
  
  ];
  function monthRevenue(month, revenue) {
    return { month, revenue };
  }

const monthlyRevenue = [
    monthRevenue('Jan', 12200),
    monthRevenue('Feb', 4500),
    monthRevenue('Mar', 9000),
    monthRevenue('Apr',8967),
    monthRevenue('May', 3829),
    monthRevenue('Jun', 3900),
    monthRevenue('Jul', 15300),
    monthRevenue('Aug', 12300),
    monthRevenue('Sep', 14300),
    monthRevenue('Oct', 1300),
    monthRevenue('Nov', 10300),
    monthRevenue('Dec', 9300),
  
  ];

  function monthOrder(month, orders) {
    return { month, orders };
  }

const monthlyOrder = [
    monthOrder('Jan', 100),
    monthOrder('Feb', 300),
    monthOrder('Mar', 900),
    monthOrder('Apr',897),
    monthOrder('May', 329),
    monthOrder('Jun', 900),
    monthOrder('Jul', 5300),
    monthOrder('Aug', 1300),
    monthOrder('Sep', 1400),
    monthOrder('Oct', 300),
    monthOrder('Nov', 1030),
    monthOrder('Dec', 900),
  
  ];

  const paymentMode = [
    { payment: 'Cash', value: 30 },
    { payment: 'Credit Card', value: 20 },
    { payment: 'UPI', value: 10 },
    { payment: 'Debit Card', value: 50 },
    { payment: 'Check', value: 60 },
    { payment: 'Net Banking', value: 40 },
  ];

export default function Deposits({ storeId }) {
    const classes = useStyles();
    const theme = useTheme();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

   
    return (
        <React.Fragment >
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Store's Revenue
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.grid}>
            <Paper className={classes.data}>
            <RevenueCard
            heading="Total Revenue"
                  content="₹1000"
                  />
            </Paper>
            <Paper className={classes.data}>
                
            <RevenueCard
            heading="Today's Revenue"
                  content="₹100"
                  />
           </Paper>
            <Paper className={classes.data}>
                    <RevenueCard
            heading="Today's Total Orders"
                  content=" 7"
                  />
            </Paper>
            </div>
            <Grid container spacing={3}>
                {/* Graph */}
                <Grid item xs={12}>
                <br/><br/>
                <Typography variant="h5">Weekly Stats</Typography>
                <div className={classes.graphs} container spacing={1}>
                <Paper className={classes.graph}>
                <Graph
                  heading="Revenue"
                  yAxisLabel="Revenue"
                  data={weeklyRevenue}
                  xAxisDataKey="day"
                  yAxisDataKey="revenue"
                  />
                </Paper>
                <Paper className={classes.graph}>
                  <Graph
                  heading="Order"
                  yAxisLabel="Orders"
                  data={weeklyOrder}
                  xAxisDataKey="day"
                  yAxisDataKey="orders"
                  />
                </Paper>
                </div>
                <br/><br/>
                <Typography variant="h5">Monthly Stats</Typography>
                <div className={classes.graphs}>
                <Paper className={classes.graph}>
                <Graph
                  heading="Revenue"
                  yAxisLabel="Revenue"
                  data={monthlyRevenue}
                  xAxisDataKey="month"
                  yAxisDataKey="revenue"
                  />
                </Paper>
                <Paper className={classes.graph}>
                  <Graph
                  heading="Order"
                  yAxisLabel="Orders"
                  data={monthlyOrder}
                  xAxisDataKey="month"
                  yAxisDataKey="orders"
                  />
                </Paper>
                </div>
                <br/><br/>
                <Typography variant="h4"> Top 3 Best Seller Items</Typography>
                <div className={classes.grid}>
            <Paper className={classes.bestSeller}>
            <BestSellerCard
            itemName="Caramel coffee"
            category="Coffee"
            price={34}
            numberOfOrders={7}
            />
            </Paper>
            <Paper className={classes.bestSeller}>
            <BestSellerCard
            itemName="Honey coffee"
            category="Coffee"
            price={90}
            numberOfOrders={11}
            />
           </Paper>
            <Paper className={classes.bestSeller}>
            <BestSellerCard
            itemName="Black coffee"
            category="Coffee"
            price={89}
            numberOfOrders={10}
            />
            </Paper>
            </div>
            <br/><br/>
            <Paper className={classes.barGraph}>
            
            <Typography variant="h4">Payment Modes</Typography>
            <Chart
               data={paymentMode}
               margin={{
                top: 16,
                right: 16,
                bottom: 35,
                left: 16,
              }}
            >
            
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="value" argumentField="payment" />
            </Chart>
            </Paper>
            </Grid>
            </Grid>
        </React.Fragment>
    );
}