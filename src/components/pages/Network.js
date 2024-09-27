import axios from "axios";
import { useEffect, useState } from "react";
import { Stack, Box, Card, CardContent, Grid2 as Grid, Table, TableHead, TableRow, TableCell, TableContainer, Typography, Button } from "@mui/material";
import { PAGE_STYLE } from "../../styles/globalStyles";
import wikiBackUrl from "../../static/imgs/wikiBack.jpg";
import gaiaLogoWhite from "../../static/imgs/gaia_deco_text_w.svg";
import { API_ROOT, NODE_INFO } from "../../constants/apiEndpoints";

function formatKeyToHeader(headerSnakeCase) {

  return headerSnakeCase.replace("_", " ") ;
}

function NodeInfoCard({
  nodeInfo
}) {

  return (
    <Stack spacing={5}>
     {
      Object.keys(nodeInfo).map((header)=>{
        return (
          <TableContainer>
          <Table size={"small"}>
            <TableRow>
              <TableHead>
                <Typography
                  variant={"h4"}
                  style={{paddingBottom: "25px"}}
                >
                  { formatKeyToHeader(header) }
                </Typography>
              </TableHead>
            </TableRow>
              { 
                Object.keys(nodeInfo[header]).map((dataKey)=>{
                  return (
                    <TableRow>
                      <TableHead>
                        {formatKeyToHeader(dataKey)}
                      </TableHead>
                      <TableCell>
                        {nodeInfo[header][dataKey]}
                      </TableCell>
                    </TableRow>
                  )
                })
              }
          </Table>
          </TableContainer>
        )
      })
     }
    </Stack>
  )
}

function NodeErrorCard() {
  return (
    <Box>
      There may be an issue with the node.  Please wait a few minutes and refresh this page before trying your next experiment.
    </Box>
  )
}

function NodeInfoPanel({title}) {
  const [nodeInfo, setNodeInfo] = useState(null);
  const [error, setError] = useState(null);

  const url = `${API_ROOT}${NODE_INFO}`;

  const config = {
    method: 'GET',
    url: url
  }

  useEffect(()=>{
    axios(config).then((resp)=>{
      setNodeInfo(resp.data);
    }, (error)=>{
      console.log(error);
      setError(true);
    });
  },[]);

  return (
    <Box 
      style={{
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: '35px',
        paddingTop: '50px'
      }}
    >
      <Stack spacing={3}>
        <Typography variant={'h5'}>
          {title}
        </Typography>

        {error? <NodeErrorCard/>: ""}
        {nodeInfo? <NodeInfoCard nodeInfo={nodeInfo}/> : ""}
        
      </Stack>
    </Box>
  )
}


export default function Network() {
    return (
      <Box  style={PAGE_STYLE}>
        <Card
         style={{
          backgroundImage: `url(${wikiBackUrl})`,
          borderRadius: `50px`,
          backgroundSize: `cover`,
          minHeight: `100vh`,
          boxShadow: `0px 0px 38px 0px rgba(0,54,120,0.27)`,
          border: `15px solid rgba(0,0,0,0.2)`,
          backdropFilter: `blur(40px)`
        }}>
         <CardContent>
          <Grid spacing={3} container>

            <Grid size={4} alignContent={'right'} item>
              <Box style={{color: 'white'}}>
                <Box>
                  <Stack spacing={3}>
                    <Box>Powered By...</Box>
                    <Box>
                      <img src={gaiaLogoWhite} height={"100px"}/>
                    </Box>

                    <Typography
                      variant={'p'}
                      style={{
                        fontSize: "13px",
                        textAlign: "right",
                        padding: '15px'
                      }}
                    >
                      Gaianet is a decentralized LLM inference protocol which empowers a network of LLM operators to participate in a unified network.  With Web3 enriching both an incentives and domain protocol, participating in Gaia and using the network's services is just a RESTful call away.  Wikitune utilizes Gaia LLM's for multiple pieces of functionality including as a formatter and parser for generating information and creating effective Prompt-Response & Question-Answer fine tuning data.  Likewise, we will be utilizing the toolchain Gaia nodes for building out more effective fuzzy searches and building out concept trees for mass creation of information-backed training structures to assist the growth and market-fitting of Gaianet LLM node operators.
                    </Typography>

                    <Button href={'https://docs.gaianet.ai/node-guide/quick-start'} target="_blank" variant="outlined" style={{border: "1px solid white", color: "white"}}>Run a Gaia Node</Button>
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid size={8} item>

              <Box>
                <NodeInfoPanel
                  title="Wikitune Node (Public)"
                />
              </Box>
            </Grid>
          </Grid>
          
         </CardContent>
        </Card>
      </Box>
    )
  };