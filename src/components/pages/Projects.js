import { useIndexedDB } from "react-indexed-db-hook"
import { DEFAULT_STORE_NAME } from "../../constants/dbConfig";
import { Box, Button, Card, CardContent, Grid2 as Grid, Stack } from "@mui/material";
import { PAGE_STYLE } from "../../styles/globalStyles";
import { useState, useEffect } from "react";
import WorkbenchView from "../util/Workbench/WorkbenchView";
import { VscCloudDownload } from "react-icons/vsc";


function downloadFile(fileData, fileName) {
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}

function ProjectList({setContent, setContentID}) {
  const { getAll } = useIndexedDB(DEFAULT_STORE_NAME);
  const [contentList, setContentList] = useState();

  useEffect(()=>{

    getAll().then((retrievedContent)=>{
      setContentList(retrievedContent);
    })
  }, [])

  return (
    <Box>
      {
        contentList?
        contentList.map((content)=>{
          return (
            <ul>
            <Button
              variant={"outlined"}
              onClick={()=>{
                setContent(content.content);
                setContentID(content.id)
              }}
              fullWidth
            >
              <Box style={{backgroundColor: 'white', paddingTop: '5px', paddingBottom: '5px'}}>
                {content.name}
              </Box>
            </Button>
            </ul>
          )
        })
        :
        "Create a Project in the Tuning Dialogue to Begin"
      }
    </Box>
  )
}

export default function Projects() {
  const { deleteRecord } = useIndexedDB(DEFAULT_STORE_NAME);
    const [activeContent, setActiveContent] = useState();
    const [contentID, setContentID] = useState();

    return (
      <Box style={PAGE_STYLE}>
        <Grid spacing={3} container>
          <Grid size={3} item>
            <Grid direction={'column'} spacing={3} container>
              <Card size={12} item>
                <CardContent>
                <Box>
                      <Stack spacing={2}>
                        <h3>Project List</h3>
                        <Box style={{fontSize: "13px", textJustify: "justify"}}>
                          Here you can review and edit your tuning data sets.  
                          Download train.txt files and use with llama.cpp to begin finetuning your LLM.
                        </Box>
                        <Box style={{fontSize: "13px", textJustify: "justify"}}>
                          Please note that your projects are being kept in an internal Database in your browser.  We do not collect any information about the queries or outcomes of interfacing with the LLM.  Frankly, we really couldn't care less-- we just want to see everyone build awesome stuff!
                        </Box>
                      </Stack>
                    </Box>
                  <ProjectList 
                    setContentID={setContentID}
                    setContent={setActiveContent}
                  />
                </CardContent>
              </Card>
              <Card size={12} item>
                
                  <CardContent>
                  

                  <Stack spacing={3}>


                    <Button 
                      onClick={()=>{downloadFile(activeContent.sftParse,'train.txt')}}
                      variant={"contained"}
                      disabled={!contentID}
                    >
                      <VscCloudDownload
                        size={"25px"}
                        color={"#FFFFFF"}
                        style={{paddingRight: "15px"}}
                      />
                       Download train.txt 
                    </Button>
                    
                    <Button 
                      target = {'_blank'}
                      href={'https://docs.gaianet.ai/creator-guide/finetune/llamacpp'}
                      variant={"outlined"} 
                    > 
                      How to Use 
                    </Button>
                    </Stack>
                  </CardContent>
                
              </Card>

              <Card size={12} item>
                
                  <CardContent>
                  
                    <Button 
                      onClick={()=>{
                        deleteRecord(contentID);
                        window.location.reload();
                      }}
                      variant={"outlined"}
                      color={"error"}
                      disabled={!contentID}
                      fullWidth
                    > 
                      Delete Project
                    </Button>
                    
                  </CardContent>
                
              </Card>


            </Grid>
          </Grid>
          <Grid size={9} item>
        {
          activeContent?
          <WorkbenchView 
            data={activeContent}
            editable={true}
            introText={"Here you can edit."}
          />
          :
          <Card> <CardContent> Select an Option from the Left to start editing and building your training sets </CardContent></Card>
        }
        </Grid>
        </Grid>
      </Box>
    )
  };