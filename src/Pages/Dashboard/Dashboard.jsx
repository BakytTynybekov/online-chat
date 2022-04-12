import { Box, Grid } from "@mui/material";
import React from "react";

function Dashboard() {
  return (
    <Box sx={{ width: "100vw", background: "white !important" }}>
      <Grid container>
        <Grid
          container
          item
          xs={2}
          style={{ background: "#104547", padding: "30px" }}
        >
          <Grid item style={{ background: "#727072", height: "60px" }}>
            sdfsd
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          item
          xs={10}
          style={{ background: "white", color: "black", height: "100vh" }}
        >
          <Grid item xs={11}>
            sfs
          </Grid>
          <Grid item xs={1} style={{ background: "#D2D6EF" }}>
            hello
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
