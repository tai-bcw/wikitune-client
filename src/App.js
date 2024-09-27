import {
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/pages/Home";
import Experiments from "./components/pages/Experiments";
import Projects from "./components/pages/Projects";
import Network from "./components/pages/Network";
import HeadNav from "./components/util/HeadNav/HeadNav";
import { useState } from "react";
import logo from './static/imgs/wikituneLogo_BLBL.svg';
import { Grid2 as Grid } from "@mui/material";
import { initDB } from "react-indexed-db-hook";
import DBConfig from "./constants/dbConfig";
import { PAGE_STYLE } from "./styles/globalStyles";
import mainBackgroundImg from "./static/imgs/webBack.jpg";

  const ROUTES = [
    {
      path: "/",
      element: (<Home/>)
    },
    {
      path: "/tuning",
      element: (<Experiments/>)
    },
    {
      path: "/projects",
      element: (<Projects/>)
    },
    {
      path: "/network",
      element: (<Network/>)
    },
  
  ]

initDB(DBConfig);

function App() {

  const [page, setPage] = useState('home');

  return (
    <Grid style={{
        backgroundImage: `url(${mainBackgroundImg})`,
        backgroundAttachment: `fixed`,
        backgroundSize: `cover`,
        boxShadow: `0px 0px 25px 25px rgba(55,54,51, 1)`
      }} 
      container
    >
      <Grid size={12} style={{backgroundColor: "white", borderBottom: "1px solid #AAAAAA"}}>
        <div style={{paddingLeft: "50px", paddingTop: "15px", paddingBottom: "15px"}}>
          <img src={logo} style={{height:"30px"}}/>
        </div>
      </Grid>

      <Grid size={12} style={{paddingTop:"5vh"}}>
        <HeadNav/>
      </Grid>

      <Grid size={12} >
        <Routes>
          {
            ROUTES.map(r=><Route path={r.path} element={r.element}/>)
          }
        </Routes>
      </Grid>
    </Grid>
  )
}

export default App;
