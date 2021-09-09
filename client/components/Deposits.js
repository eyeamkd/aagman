import React,{useEffect} from 'react';
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
import {Chart,PieSeries,Title,} from '@devexpress/dx-react-chart-material-ui';
import { LineChart, Line, XAxis, YAxis, Label} from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {GET_REVENUE} from '../GraphQL/Queries/StoreQueries';
import { useQuery } from '@apollo/client';


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
        display:"flex",
        

    },
    data: {
        margin: "7px",
        display:"flex",
        padding:"20px",
        height:"200px",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: "20px",
       
    },
    bestSeller: {
        margin: "7px",
        padding:"20px",
        display:"flex",
        height:"250px",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: "20px",
       
    },
    graphs:{
        display:"flex",
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
        width:"450px",
        height:"350px",
       
    }
}));

const weekCount=[
    {day:'Sun',revenueCount:0,orderCount:0,label:0},
    {day:'Mon',revenueCount:0,orderCount:0,label:1},
    {day:'Tue',revenueCount:0,orderCount:0,label:2},
    {day:'Wed',revenueCount:0,orderCount:0,label:3},
    {day:'Thur',revenueCount:0,orderCount:0,label:4},
    {day:'Fri',revenueCount:0,orderCount:0,label:5},
    {day:'Sat',revenueCount:0,orderCount:0,label:6}]

const yearCount=[
    {month:"Jan",revenueCount:0,orderCount:0,label:0},
    {month:"Feb",revenueCount:0,orderCount:0,label:1},
    {month:"Mar",revenueCount:0,orderCount:0,label:2},
    {month:"Apr",revenueCount:0,orderCount:0,label:3},
    {month:"May",revenueCount:0,orderCount:0,label:4},
    {month:"Jun",revenueCount:0,orderCount:0,label:5},
    {month:"Jul",revenueCount:0,orderCount:0,label:6},
    {month:"Aug",revenueCount:0,orderCount:0,label:7},
    {month:"Sep",revenueCount:0,orderCount:0,label:8},
    {month:"Oct",revenueCount:0,orderCount:0,label:9},
    {month:"Nov",revenueCount:0,orderCount:0,label:10},
    {month:"Dec",revenueCount:0,orderCount:0,label:11},
]


const COLORS = ["#4792c9","#0072b0","#6190e6", "#3f66da", "#85c9ea", "#002263"];
  const paymentMode = [
    { payment: 'Cash', value: 0 },
    { payment: 'CreditCard', value: 0 },
    { payment: 'UPI', value: 0 },
    { payment: 'DebitCard', value: 0 },
    { payment: 'Check', value: 0},
    { payment: 'NetBanking', value: 0 },
  ];
  const renderCustomizedLabel = ({
    x, y, payment
  }) => {
    return (
      <text x={x} y={y} fill="black" >
        {payment}
      </text>
    );
  };

export default function Deposits({ storeId }) {
    const classes = useStyles();
    const theme = useTheme();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const { data, loading, error, refetch } = useQuery(GET_REVENUE,
        {
            variables: {
                getRevenueStoreId: "6135b25836aacd3f48beedc9"
            },
            pollInterval:2000
        });
    
        let todaysOrders=0
            let todaysRevenue=0

            if (loading)
            return (<div>Loading...</div>);
    
        if (error)
            return (<div>Error! ${error.message}</div>);
           let revenue = Object.values(data)[0].revenue;
           let orders=revenue.orders
            
            let d=new Date()
            for(let i=0;i<orders.length;i++){
                if(d.setHours(0,0,0,0) == new Date(orders[i].dateAndTime).setHours(0,0,0,0)){
                  todaysOrders+=1
                  todaysRevenue+=orders[i].bill.totalCost
                }

                let mode=orders[i].bill.paymentMode
                let obj1=paymentMode.find(o=>o.payment==mode)
                obj1.value+=1

                let day=(new Date(orders[i].dateAndTime)).getDay()
                let obj=weekCount.find(o=>o.label==day)
                obj.revenueCount+=orders[i].bill.totalCost
                obj.orderCount+=1

                let month=(new Date(orders[i].dateAndTime)).getMonth()
                obj=yearCount.find(o=>o.label==month)
                obj.revenueCount+=orders[i].bill.totalCost
                obj.orderCount+=1 
            }
    
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
                  content={"₹"+revenue.totalIncome}
                  />
            </Paper>
            <Paper className={classes.data}>
                
            <RevenueCard
            heading="Today's Revenue"
                  content={"₹"+todaysRevenue}
                  />
           </Paper>
            <Paper className={classes.data}>
                    <RevenueCard
            heading="Today's Total Orders"
                  content={todaysOrders}
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
                  data={weekCount}
                  xAxisDataKey="day"
                  yAxisDataKey="revenueCount"
                  />
                </Paper>
                <Paper className={classes.graph}>
                  <Graph
                  heading="Order"
                  yAxisLabel="Orders"
                  data={weekCount}
                  xAxisDataKey="day"
                  yAxisDataKey="orderCount"
                  
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
                  data={yearCount}
                  xAxisDataKey="month"
                  yAxisDataKey="revenueCount"
              
                  />
                </Paper>
                <Paper className={classes.graph}>
                  <Graph
                  heading="Order"
                  yAxisLabel="Orders"
                  data={yearCount}
                  xAxisDataKey="month"
                  yAxisDataKey="orderCount"
            
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
            <PieChart width={400} height={400}>
          <Pie
            data={paymentMode}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}

            dataKey="value"
          >
            {paymentMode.map((entry, index) => (
              <Cell key={`cell-${index}`}  fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
            </Paper>
            </Grid>
            </Grid>
        </React.Fragment>
    );
}