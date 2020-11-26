import { Button, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  header: {
    backgroundColor: "black",
    color: "white",
    padding: "20px 20px",
  },
  section: {
    backgroundColor: "#9D979D",
    padding: "50px 50px",
  },
  input: {
    border: "1px solid black",
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    color: "black",
    backgroundColor: "green",
    width:"100%"
  },
  output: {
    border: "1px solid black",
    width: "100%",
    padding: "5px",
    backgroundColor: "white",
  },
}));
export default function WelcomeUI() {
  const classes = useStyles();
  const [url, setUrl] = React.useState();
  const [hashUrl, setHashUrl] = React.useState("");
  const HOST = "http://localhost:8000";

  const handleClick = (event) => {
    if(!url){
      return;
    }
    event.preventDefault();
    Axios.post(`${HOST}/hashing.api.co/v1/url`, {
      longUrl: url,
    }).then((res) => {
      console.log(res);
      setHashUrl(res.data.hashUrl);
    });
    setUrl("");
  };
  return (
    <>
      <Paper component="form" className={classes.root}>
        <Grid container direction="column">
          <Grid container direction="column" className={classes.header}>
            <Grid item xs={12}>
              <Typography variant="h3" component="h6">
                HashURLs
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6">
                System to generate short aliases for redirection of long URLs.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
            className={classes.section}
          >
            <Grid item xs={11} lg={6}>
              <InputBase
                className={classes.input}
                placeholder="Enter long URLs for hashing"
                inputProps={{ "aria-label": "search google maps" }}
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </Grid>
            <Grid item xs={11} lg={3}>
              <Button
                className={classes.button}
                onClick={(event) => handleClick(event)}
              >
                Change into HashURL
              </Button>
            </Grid>
            <Grid item xs={11} lg={6}>
              <InputBase
                className={classes.output}
                placeholder="Copy Clipboard"
                inputProps={{ "aria-label": "search google maps" }}
                value={hashUrl}
                onChange={(event) => setHashUrl(event.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
