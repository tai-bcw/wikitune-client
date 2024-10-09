import { useState } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Stack,
    Box, 
    Grid2 as Grid,
    Card,
    CardContent,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import { useIndexedDB } from "react-indexed-db-hook";
import {
    API_ROOT,
    WIKIPEDIA,
    QUERIES_LIST,
    PARSE
} from "../../constants/apiEndpoints";

import MessageList from '../util/ExperimentsUtils/MessageList';
import { estimateQueryTime } from '../../utils/formatUtils';
import WorkbenchView from '../util/Workbench/WorkbenchView';
import { PAGE_STYLE } from '../../styles/globalStyles';
import  baseLoaderImg from "../../static/imgs/loader_temp.gif";

import fandomLogo from '../../static/imgs/fandom.png';
import wikipediaLogo from '../../static/imgs/wikipedia.png';
import wikijsLogo from '../../static/imgs/wikijs.png';

const PHASES = {
    start: 'start',
    check: 'check',
    workshop: 'workshop',
    submit: 'submit'
}

const EXPERIMENT_WK_TXT = "Review your training data here.  This data cannot be interacted with here, in order to do that, please add or create a new project and head over to the project tab to begin curating your data for use for finetuning a model.  ** Warning ** If you navidate away from this page/tab or start a new experiment, any data not saved to a project will be lost."

function requestURL(
    url,
    subject,
    setLoading,
    setSubjectData,
    ctxSet,
    nextPhase,
    previousPhase,
    loadingPhase
){
  const config = {
    method: 'GET',
    url: `${url}?subject=${subject}`
  }
  
  
  if (loadingPhase) {
    ctxSet(loadingPhase);
  }
  setLoading(true);
  
  axios(config).then((response)=>{
    if (response.status === 200) {
      setSubjectData(response.data);
      setLoading(false)
    } else {
      //handle request error
    }
  }).finally(()=>{
      ctxSet(nextPhase);
  }).catch((err)=>{
    alert('Subject Not Found');
    setLoading(false);
    ctxSet(previousPhase);
  })
};

/*
  !!!COMPONENTS!!!
*/

const WIKI_OPTIONS = [
  {label: "Wikipedia", slug: 'wikipedia', enabled: true, img: wikipediaLogo},
  {label: "Fandom", slug: 'fandom', enabled: false, img: fandomLogo},
  {label: "Wiki.js (Custom)", slug: 'wiki_js', enabled: false, img: wikijsLogo},
];

const INFERENCE_OPTIONS = [
  {label: "Question Answering", slug: 'txt_ques_ans', enabled: true},
  {label: "Text Classification", slug: 'txt_classification', enabled: false},
  {label: "Text Generation", slug: 'txt_generation', enabled: false}
]

const selectIconStyles = {
  height: '15px',
  marginRight: '25px',
  marginLeft: '5px',
  display: 'inline-block'
}

function WikiSelect() {
  return (
    <Select
      defaultValue={'wikipedia'}
    >
      {
        WIKI_OPTIONS.map((d)=>{
          return (
            <MenuItem value={d.slug}  disabled={!d.enabled}>
              <Box style={{verticalAlign: 'middle'}}> 
              <Box
                  style={{display:'inline-block'}}
                >
                  {d.label} 
                </Box>
                <img src={d.img} style={selectIconStyles}/>        

              </Box>        
            </MenuItem>
          )
        })
      }
    </Select>
  )
}

function InferenceSelect() {
  return (
    <Select
      defaultValue={'txt_ques_ans'}
    >
      {
        INFERENCE_OPTIONS.map((d)=>{
          return (
            <MenuItem value={d.slug}  disabled={!d.enabled}>
              <Box style={{verticalAlign: 'middle'}}> 
              <Box
                  style={{display:'inline-block'}}
                >
                  {d.label} 
                </Box>
              </Box>        
            </MenuItem>
          )
        })
      }
    </Select>
  )
}


function StartExperiment({
    ctxSet,
    setLoading,
    setSubjectData,
    setSubject,
    subject
}){
    const CHECK_API_URL = `${API_ROOT}${WIKIPEDIA}${QUERIES_LIST}`;
    
    return (
      <Box sx={{width: "100%", alignContent: "center"}} alignContent={'center'}>
        <Card style={{
          marginTop: "15vh",
          marginLeft: "20vw",
          paddingTop: "30px",
          paddingBottom: "25px",
          paddingLeft: "10px",
          paddingRight: "10px",
          maxWidth: "50vw",
          alignText: "center"
        }}>
          <CardContent>
            <Stack spacing={2}>                   
              <Typography variant={'h5'}>
                Tuning 
              </Typography>
              
              <Typography variant={'p'} style={{fontSize: '12px', textAlign:'justify', maxWidth: '500px'}}>
                Enter your query here.  Note that at this point, your subject must match an article in your chosen wiki.  We are working hard to build a more effective fuzzy search using our LLM engines in order to better assist you in building your composited information-backed training sets.
              </Typography>
              
              <WikiSelect/>    
              <InferenceSelect/>

              <TextField 
                label="Subject"
                variant="outlined"
                onChange={(evt)=>{setSubject(evt.target.value)}}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={()=>{requestURL(CHECK_API_URL, subject, setLoading, setSubjectData, ctxSet, PHASES.check, PHASES.start)}}
                disabled={subject.length < 1}
                fullWidth
              >
                  Start
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    )
};

function CheckExperiment({ 
    ctxSet,
    setLoading,
    subjectData,
    setQueryData,
    subject
}) {

  const QUERY_URL = `${API_ROOT}${WIKIPEDIA}${PARSE}`
  return (
    <>
      <Grid spacing={5} container>
        <Grid size={5}>
          
            <Card>
              <CardContent>
              <Stack spacing={3}>
              <Card>
                <CardContent>
                  <h1>Experiment PreFlight </h1>
                  <div style={{fontSize: "12px"}}>
                    Here, you can review the messages that will be passed to the LLM
                    for your review.  If the node which your provider has chosen has
                    request limits, it may take a few minutes to get your training data.
                    After this section, you will be able to review the training data and 
                    add it to your projects for further processing.
                  </div>
                  <h3>Query Info </h3>
                  <div>
                    Number of Queries: {subjectData.queries_list.length}
                  </div>
                  <div>
                    Estimated Render Time: {estimateQueryTime(subjectData.queries_list.length)}
                  </div>
                </CardContent>
              </Card>
              
              <Button
                variant="contained"
                onClick={()=>{
                    requestURL(
                      QUERY_URL,
                      subject,
                      setLoading,
                      setQueryData,
                      ctxSet,
                      PHASES.workshop,
                      PHASES.check,
                      PHASES.submit
                    )
                }}
                fullWidth
              >
                Start Experiment
              </Button>

              <Button 
                color="error"
                variant="contained"
                onClick={()=>{window.location.reload()}}
                fullWidth
              >
                New Experiment
              </Button>

              </Stack>
              </CardContent>
            </Card>
          
        </Grid>
        <Grid size={7} item>
        {
          <MessageList msgList = {subjectData.queries_list} />
        }
        </Grid>

      </Grid>
      
    </>
  )
}


function SubmitPage() {
    return (
        <div style={PAGE_STYLE}>
        <Card>
          <CardContent>
            <h4>
            Submitting Experiment...
            </h4>
            
            This can take quite a few minutes as the LLM churns through the data
            and creates your fine tuning data.
  
            <div style={{color: "red"}}>
              Do not navigate away from this page or you will lose all your progress
            </div>
          </CardContent>
        </Card>
        </div>
    )
}

function LoadingPage() {
  return (        
   <Box style={PAGE_STYLE}>
    <Card style={{
      maxWidth: "10vw",
      display: "block",
      textAlign: "center",
      padding: "25px",
      marginLeft: "40vw",
      marginTop: "15vh",
      boxShadow: `0px 0px 38px 0px rgba(0,54,120,0.27)`

    }}>
      <CardContent>
        <img src={baseLoaderImg} style={{height: "100px"}}/>
        <h3>Loading...</h3>
      </CardContent>
    </Card>
    </Box>)
}

function ExperimentWorkshop({queryData}) {
    return (
      <>  
      <h3>Experiment Workshop</h3>
      <WorkbenchView
        data={queryData.parse}
        editable={false}
        introText={EXPERIMENT_WK_TXT}
        showControls={true}
      />
      </>
    )
}

export default function Experiments() {

    const [phase, setPhase] = useState(PHASES.start);
    const [isLoading, setLoading] = useState(false);
    const [subjectData, setSubjectData] = useState(null);
    const [subject, setSubject] = useState("");
    const [queryData, setQueryData] = useState(null);
    const [setSource, source] = useState('wikipedia');
    const [metadata, setMetadata] = useState({});

    if (isLoading) {
        if (phase != PHASES.submit) {
          return <LoadingPage/>
        } else {
          return <SubmitPage/> 
        }
    }

    switch(phase){
        case (PHASES.start):
          return (
            <div style={PAGE_STYLE}>
            <StartExperiment 
              ctxSet={setPhase}
              setLoading={setLoading}
              setSubjectData = {setSubjectData}
              setSubject={setSubject}
              subject={subject}
            />
            </div>
          )
        case (PHASES.check):
          return (
            <div style={PAGE_STYLE}>
            <CheckExperiment
              ctxSet={setPhase}
              setLoading={setLoading}
              subjectData={subjectData}
              subject={subject}
              setQueryData={setQueryData}
            />
            </div>
          )
        case (PHASES.workshop):
            return (
              <div style={PAGE_STYLE}>
              <ExperimentWorkshop
                queryData={queryData}
              />
              </div>
            )
        default:
            return <StartExperiment/>
      
    }  
};