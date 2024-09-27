import { Stack, Card, CardContent, Box, Grid2 as Grid, Typography } from "@mui/material";
import { PAGE_STYLE } from "../../styles/globalStyles";
import monoLogo from "../../static/imgs/wikituneLogo_BLBL.svg";
import howDiagramImg from "../../static/imgs/how_diagram.png";
import { useRef } from "react";

const HOW_TO_USE = "How to Use Wikitune";
const HOW_WORK = "How Wikitune Works";
const FAQ = "Frequently Asked Questions (FAQ)";
const ROADMAP = "Roadmap"
const ABOUT = "About";
const ABOUT_BODY = "Wikituner is an application built to allow operators of bespoke LLM's to build finetuning sets for their nodes from Wiki's around the web.  Whether sourcing from internet stalwart Wikipedia or any other varieties of Wiki's, this application seeks to build tunable sets of data for your specialized LLM usecases.";

export default function Home() {
  return (
    <Box style={PAGE_STYLE}>
      <Grid spacing={2} container>
        <Grid size={6} item>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h5">
                  { ABOUT }
                  <img style={{height: "35px", paddingLeft:"17px"}} src={monoLogo}/>
                </Typography>
                <Typography variant={'p'}  style={{fontSize: "14px"}}>
                  <Stack spacing={3}>
                    <Box>Wikitune is an application built to allow operators of bespoke LLM's to build finetuning sets for their nodes from Wiki's around the web.  Whether sourcing from internet stalwart Wikipedia or any other varieties of Wiki's, this application seeks to build tunable sets of data for your specialized LLM usecases.</Box>
                    <Box>This application is meant as a support app for the deployment of custom LLM's.  It utilizes Decentralized AI (DeAI) protocol, <strong>Gaia Network</strong> for creation of training set.  In the interest of supporting an <strong> Living Knowledge</strong> ecosystem, we seek to connect one of the original crowd-sourced knowledge evolution machines: The Wiki with decentralized technologies.  To us, this seems like not only a natural fit, but an inevitable one. </Box>
                    <Box> Although a relatively simple usecase, by addressing the usability of tuning on open source LLM's, Wikitune can be used by communities to build out custom LLM's that serve their bespoke needs. </Box>
                  </Stack>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={6} item>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h5">
                  { HOW_TO_USE }
                </Typography>
                <Typography style={{fontSize: "14px"}} variant="p">
                  Wikitune is a simple toolchain enhancer so you can use it in 3 main steps:

                  <ul>First, make a query to the Tuning engine.  <strong> Note: As of 26 September 2024, this query must match an entry on Wikipedia. </strong> In the future, we hope to add other wiki formats & protocols.</ul>
                  <ul>Next, Review the content of your submission.  Ensure that the data and the outputs are factually accurate.</ul>
                  <ul>Finally, run your experiment.  For larger articles, the query time can take up to a few minutes (estimates for time can be found on the previous step).  Save your experiment to be later added into a project.</ul>

                  Proper fine tuning takes <strong>thousands</strong> of question/answers in order to truly build a good tuned model.  This is why we have added a Project Workbench for you to build your set from interconnected wiki articles based on the topic of your choosing.
                  
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={6} item>
          <Card>
            <CardContent>
              <Stack spacing={3}>
              <Typography variant="h5">
                { HOW_WORK }
              </Typography>
              <Typography variant="p" style={{fontSize: "14px"}}>
                Wikitune works by linking tokenized wiki-based articles into a feedback loop where the question/answer formatted training sets can be used to create training sets.
              </Typography>
              <Box style={{textAlign: 'center'}}>
                <img src={howDiagramImg} style={{height:"190px", width:"720px"}}/>
              </Box>
              <Box style={{fontSize: "14px"}}>
                Wikitune operates by creating a feedback loop between Wiki knowledge sources to allow existing decentralized LLM's tune towards specific knowledgebase and existing LLM's.  Whether boutique usecases or a rapidly expanding general case model, LLM's create an evolutionary chain where one grouping of decentralized knowledge (The Wiki) connects with decentralized & open sourced models-- thus allowing both to improve and expand their usability and reach.
              </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={6} item>
          <Card>
            <CardContent>
              <Stack spacing={3}>
              <Typography variant="h5">
                { ROADMAP }
              </Typography>
              <Typography variant="p"  style={{fontSize: "14px"}}>
                <Box>This tool was derived from a toolchain we are already looking to expand for building out LLM's (as of now, specifically on the <a href="https://gaianet.ai"  target="_blank">Gaia</a> ecosystem). Moving forward, we will begin investigating possible expansions to allow LLM operators to build amazing bespoke opportunities. </Box>

                <strong><ol>Q4 2024 - Train & Deploy a Gaia Node</ol></strong>
                <Box> In order to scale out our service and increase speed and efficiency, we will be investigating how to utilize DeAI tools to create an infrastructure fabric for high throughput training.  We will also seek to acquire a Wikitune Gaia <strong>domain</strong> and build out a node specific for creating knowledge feedbacks and finetuning.</Box>

                <strong><ol>Q4 2024 - Workbench Feature Expansion </ol></strong>
                <Box> For this early release, the Project workbench has extremely limited functionality.  Moving forward, we seek to add set evaluations and improving tuning Q/A quality with fully customizable parameters going into the LLM set. </Box>

                <strong><ol>2025 - Wikis, Wikis, Wikis </ol></strong>
                <Box> This aspect will begin to expand almost immediately but by 2025, the goal will be to service both Open Wiki and Fandom-based wikis so community sourced knowledge can be used for tuning almost immediately. </Box>


                <strong><ol> TBA - DePIN Deployment & Integration</ol></strong>
                <Box> One of the most exciting areas of DeAI (and possibly modern Web3 in general) is the Decentralized Physical Infrastructure Networking.  Currently, we are currently investigating building a comprehensive deploy-to-use-to-earn pipeline for building out a system that will enrich the data acquisition, data processing, training, and inference delivery of DePIN opportunities. </Box>
              </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
};