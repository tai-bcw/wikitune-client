import { Link } from "react-router-dom";
import { Grid2 as Grid, Box } from "@mui/material";
import { useState } from "react";
import { LuHome } from "react-icons/lu";
import { LuMagnet } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { LuGlobe2 } from "react-icons/lu";

const PADDING_VERT = "15px";
const PADDING_LFT = "27px";
const PADDING_RGT = "27px";
const UNSELECT_GREY = "rgba(0,0,0,0.1)"

const tabStyle = {
  paddingTop: PADDING_VERT,
  paddingBottom: PADDING_VERT,
  paddingLeft: PADDING_LFT,
  paddingRight: PADDING_RGT,
  borderLeft: `1px solid ${UNSELECT_GREY}`,
  borderRight: `1px solid ${UNSELECT_GREY}`,
  borderTop: `1px solid ${UNSELECT_GREY}`
}

const linkStyle = {
  textDecoration: 'none',
  color: '#333333'
}

export default function HeadNav() {
  const url = document.URL.split("/");
  const currentPath = url[url.length -1] 
  
  const [active, setActive] = useState(currentPath);

  return (
    <Box style={{marginLeft: "5vw"}}>
      <Grid container spacing={1}>
        <Grid size={6} item>
        <Grid  spacing={1} container>
        <Grid size={3} style={{...tabStyle, backgroundColor: active == 'home'? 'white' : UNSELECT_GREY}}>
          <Link
            to="/"
            onClick={() => {
              setActive("home");
            }}
            style={linkStyle}
          >
            <LuHome
              style={{
                paddingRight: '10px'
              }}
            />
            Home
          </Link>
        </Grid>

        <Grid size={3} style={{...tabStyle, backgroundColor: active == 'tuning'? 'white' : UNSELECT_GREY}}>
          <Link
            to="/tuning"
            onClick={() => {
              setActive("tuning");
            }}
            style={linkStyle}
          >
            <LuMagnet
              style={{
                paddingRight: '10px'
              }}
            />
            Tuning
          </Link>
        </Grid>

        <Grid size={3} style={{...tabStyle, backgroundColor: active == 'projects'? 'white' : UNSELECT_GREY}}>
          <Link
            to="/projects"
            onClick={() => {
              setActive("projects");
            }}
            style={linkStyle}
          >
            <LuFolder
              style={{
                paddingRight: '10px'
              }}
            />
            Projects
          </Link>
        </Grid>

        <Grid size={3} style={{...tabStyle, backgroundColor: active == 'network'? 'white' : UNSELECT_GREY}}>
          <Link
            to="/network"
            onClick={() => {
              setActive("network");
            }}
            style={linkStyle}
          >
            <LuGlobe2
              style={{paddingRight: '10px'}}
            />
            Network
          </Link>
          </Grid>
        </Grid>
        </Grid>        
      </Grid>
    </Box>
  );
}
