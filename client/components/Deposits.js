import React,{useEffect,useState} from 'react';
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
import { GET_USERS_STORES_FROM_EMAIL } from '../GraphQL/Queries/UsersQueries'
import { useQuery } from '@apollo/client';
import Select from '@material-ui/core/Select';
import moment from "moment";
import Box from '@material-ui/core/Box';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    heading:{
        display:"flex",
        justify:"space-between"
    },
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
        margin:"5px",        

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
        top:"50%",
        height:"125px",
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
        width:"325px",
        height:"350px",
        borderRadius:"20px",
       
    },
    select:{
     backgroundColor:"white",
     borderRadius:"10px",
     padding:"5px",
     marginLeft:"20px"
     
    },
    paymentTitle:{
        textAlign: 'center',
       
        
    }
}));


  const renderCustomizedLabel = ({
    x, y, payment
  }) => {
    return (
      <text x={x} y={y} fill="black" >
        {payment}
      </text>
    );
  };

export default function Deposits({ storeId, userEmail }) {
    console.log(storeId,userEmail)
    const classes = useStyles();
    const theme = useTheme();
    const [storeIdentification,setStoreIdentification]=useState(storeId)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const { data, loading, error, refetch } = useQuery(GET_REVENUE,
        {
            variables: {
                getRevenueStoreId: storeIdentification
            },
            pollInterval:2000
        });
    const { data:storesData, loading:storesLoading, error:storesError } = useQuery(GET_USERS_STORES_FROM_EMAIL,
            {
                variables: {
                    getUserStoreIdEmail: userEmail
                }
            });
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

        const handleInputChange = e => {
            setStoreIdentification(e.target.value);
            refetch()
        }
    
        let todaysOrders=0
            let todaysRevenue=0
          if(storesLoading)
          return (<div>Loading...</div>);

          if(storesError)
          return (<div>Error! ${error.message}</div>);
            const stores = Object.values(storesData)[0].stores

            if (loading)
            return (<div>Loading...</div>);
    
        if (error)
            return (<div>Error! ${error.message}</div>);
            console.log(data)
           let revenue = Object.values(data)[0].revenue;
           
           let orders=revenue.orders
            let arr=[]
            let d=new Date()
            let m=moment()
            for(let i=0;i<orders.length;i++){
                if(d.setHours(0,0,0,0) == new Date(orders[i].dateAndTime).setHours(0,0,0,0)){
                  todaysOrders+=1
                  todaysRevenue+=orders[i].bill.totalCost
                }
                for(let j=0;j<orders[i].itemsList.length;j++){
                    arr.push(orders[i].itemsList[j].name)
                }
                let mode=orders[i].bill.paymentMode
                let obj1=paymentMode.find(o=>o.payment==mode)
                obj1.value+=1
                    
                 let m1=moment(orders[i].dateAndTime)
                 if(m1.isoWeek()==m.isoWeek()){
                let day=(new Date(orders[i].dateAndTime)).getDay()
                let obj=weekCount.find(o=>o.label==day)
                obj.revenueCount+=orders[i].bill.totalCost
                obj.orderCount+=1
                }
              //  }
               // if(m1.isoMonth()==m.isoMonth()){
                let month=(new Date(orders[i].dateAndTime)).getMonth()
                let obj=yearCount.find(o=>o.label==month)
                obj.revenueCount+=orders[i].bill.totalCost
                obj.orderCount+=1 
              //  }
            }
            const mappings = {}
            for (let i = 0; i < arr.length; i++) {
                mappings[arr[i]] = mappings[arr[i]] + 1 || 1
            }
            const sorted = Object.keys(mappings).sort((a, b) => { 
                if (mappings[b] === mappings[a]) { 
                    return a > b ? 1 : -1 
                }
                return mappings[b] - mappings[a]
            })
          
            for(var k=0;k<paymentMode.length;k++){
                if(paymentMode[k].value==0){
                    paymentMode.pop(paymentMode[k])
                    k=0;
                }
            }
            
    
    return (
        <React.Fragment >
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    
                    <Typography  className={classes.title} variant="h6" noWrap>
                    <Grid className={classes.heading} >
                    <Grid item>
                        Store's Revenue
                        </Grid>
                        <Grid item>
                        <Select
                            native
                            name="store"
                            value={storeIdentification}
                            onChange={handleInputChange}
                            label="Store"
                            className={classes.select}
                        >
                        <option aria-label="None" value="" />
                                {stores.map((store, index) =>
                                    <option key={index} value={store.id}>{store.name}</option>
                                )}
                        </Select>
                        </Grid>
                        </Grid>
                    </Typography>
                    
                </Toolbar>
            </AppBar>
            <div className={classes.grid}>
            <Box boxShadow={10} className={classes.data}>
            <RevenueCard
            heading="Total Revenue"
                  content={"₹"+Math.round(revenue.totalIncome)}
                  />
            </Box>
            <Box boxShadow={10} className={classes.data}>
                
            <RevenueCard
            heading="Today's Revenue"
                  content={"₹"+Math.round(todaysRevenue)}
                  />
           </Box>
            <Box boxShadow={10} className={classes.data}>
                    <RevenueCard
            heading="Today's Total Orders"
                  content={todaysOrders}
                  />
            </Box>
            </div>
            <Grid container spacing={3}>
                {/* Graph */}
                <Grid item xs={12}>
                <br/><br/>
                <Typography variant="h5">Weekly Stats</Typography>
                <div className={classes.graphs} container spacing={1}>
                <Box boxShadow={10} className={classes.graph}>
                <Graph
                  heading="Revenue"
                  yAxisLabel="Revenue"
                  data={weekCount}
                  xAxisDataKey="day"
                  yAxisDataKey="revenueCount"
                  />
                </Box>
                <Box boxShadow={10} className={classes.graph}>
                  <Graph
                  heading="Order"
                  yAxisLabel="Orders"
                  data={weekCount}
                  xAxisDataKey="day"
                  yAxisDataKey="orderCount"
                  
                  />
                </Box>
                </div>
                <br/><br/>
                <Typography variant="h5">Monthly Stats</Typography>
                <div className={classes.graphs}>
                <Box boxShadow={10} className={classes.graph}>
                <Graph
                  heading="Revenue"
                  yAxisLabel="Revenue"
                  data={yearCount}
                  xAxisDataKey="month"
                  yAxisDataKey="revenueCount"
              
                  />
                </Box>
                <Box boxShadow={10} className={classes.graph}>
                  <Graph
                  heading="Order"
                  yAxisLabel="Orders"
                  data={yearCount}
                  xAxisDataKey="month"
                  yAxisDataKey="orderCount"
            
                  />
                </Box>
                </div>
                <br/><br/>
                <Typography variant="h4"> Top 3 Best Seller Items</Typography>
                <div className={classes.grid}>
            <Box boxShadow={10} className={classes.bestSeller}>
            <BestSellerCard
            itemName={sorted[0]}
            numberOfOrders={mappings[sorted[0]]}
            />
            </Box>
            <Box boxShadow={10} className={classes.bestSeller}>
            <BestSellerCard
            itemName={sorted[1]}
            numberOfOrders={mappings[sorted[1]]}
            />
           </Box>
            <Box boxShadow={10} className={classes.bestSeller}>
            <BestSellerCard
            itemName={sorted[2]}
            numberOfOrders={mappings[sorted[2]]}
            />
            </Box>
            </div>
            <br/><br/>
            <Box boxShadow={10} className={classes.barGraph}>
            <Typography variant="h4" className={classes.paymentTitle}>Payment Mode</Typography>
            <PieChart width={325} height={300}>
            
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
            </Box>
            </Grid>
            </Grid>
        </React.Fragment>
    );
}