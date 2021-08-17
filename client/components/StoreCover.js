  import Card from '@material-ui/core/Card'
  import CardContent from '@material-ui/core/CardContent'
  import {makeStyles} from '@material-ui/core/styles'
  import Typography from '@material-ui/core/Typography'

  const useStyles = makeStyles({
    cover: {
      backgroundColor: "rgba(106,72,245,255)",
      backgroundPosition: "center",
      padding: "35px 25px",
      borderRadius: "20px",
      margin: "10px",
      color: "white",
    },
    title: {
      fontSize: 40,
      fontWeight: "500",
      color: "inherit"
    },
    textContainer: {
      color: "inherit",
    },
  });
  
  const StoreCover = () => {
    const classes = useStyles();
  
    return (
      <Card className={classes.cover} variant="outlined">
        <CardContent className={classes.textContainer}>
          <Typography className={classes.title} gutterBottom>
            Store Name
          </Typography>
          <Typography variant="h5" component="h2">
            Description of the store.
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default StoreCover;