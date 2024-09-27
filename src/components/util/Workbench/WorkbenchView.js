import { Modal, Box, Button, Card, CardContent, Grid2 as Grid, Stack, TextField } from "@mui/material";
import CodeView from "./CodeView";
import { copyToClipboard } from "../../../utils/formatUtils";
import { VscCopy } from "react-icons/vsc";
import { VscNewFolder } from "react-icons/vsc";
import { useIndexedDB } from "react-indexed-db-hook";
import { DEFAULT_STORE_NAME } from "../../../constants/dbConfig";
import { useState } from "react";

/*
{
  csvParse  : <String>
  sftParse  : <String>
  jsonParse : { question: <String>, answer: <String> }
  parseTime : Number
}

*/

function ProjectNameModal({
    open,
    setClose,
    nameSetter,
    saveName
}) {

  return (
    <Modal
      open={open}
      onClose={()=>{}}
    >
      <Box>
        <Card style={{maxWidth: "50vw", marginLeft: "25vw", marginTop: "25vh"}}>
          <CardContent>
            <Stack spacing={3}>
              <Box>
                Enter Project Name
              </Box>
              <TextField onChange={(evt)=>{nameSetter(evt.target.value)}} label="Project Name" variant="outlined"/>
              <Box>
                <Grid spacing={5} container>
                  <Grid size={6} item>
                    <Button variant="contained" color="error" onClick={()=>{setClose(false)}} fullWidth> Cancel</Button>
                  </Grid>
                  <Grid size={6}>
                    <Button variant="contained" onClick={()=>{saveName();}} fullWidth>Save</Button>
                  </Grid>                  
                </Grid>
              </Box>
            </Stack>
            
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}


export default function WorkbenchView({ data, editable, introText, showControls, title }) {
  const { add } = useIndexedDB(DEFAULT_STORE_NAME);
  const [isAdding, setIsAdding] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [projectName, setProjectName] = useState();

  const appendProject = () => {

  }

  const addNewProject = () => {
    if (!projectName) {
        alert("Please enter a Project Name");
        return;
    }

    add({name: projectName, content: data}).then(
        (evt) => {
          // console.log(`added: ${evt.target.result}`, data);          
          alert('Project Added');
          window.location.reload();
        },
        (error) => {
           console.log("IDXDB", error);
           
        }
    )
  }

  return (
    <Box>
      <ProjectNameModal open ={isAdding} nameSetter={setProjectName} setClose={setIsAdding} saveName={addNewProject} />
      <Grid spacing={2} container>
        <Grid size={showControls? 6 : 0} item>
          { showControls? 
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <h3>{title || "About"}</h3>
                <Box>{introText}</Box>

                <Button variant="contained" color="info" onClick={()=>{setIsAdding(true)}} fullWidth>
                  <VscNewFolder color="white" height="25px"/>
                   <div style={{marginLeft: "10px"}}>
                     New Project
                   </div>
                </Button>

                <Button
                  variant="contained"
                  color="info"
                  onClick={()=>{appendProject()}}
                  disabled
                  fullWidth
                >
                  + Add to Project
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={()=>{window.location.reload()}} 
                  fullWidth
                >
                  New Experiment
                </Button>
              </Stack>
            </CardContent>
          </Card>
          : ""}

        </Grid>
        <Grid size={showControls? 6 : 12} item>
          <Card>
            <CardContent>
              <Grid spacing={0} container>
                <Grid size={6} item>
                  SFT Training Format
                </Grid>
                <Grid size={6} item>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      onClick={() => {
                        copyToClipboard(
                          JSON.stringify(data.sftParse, null, `\t`)
                        );
                      }}
                    >
                      <VscCopy size="20px" />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <CodeView
                codeString={data.sftParse}
                styleType={"nord"}
                language={"html"}
                editable={editable}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardContent>
              <Grid spacing={0} container>
                <Grid size={6} item>
                  JSON
                </Grid>
                <Grid size={6} item>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      onClick={() => {
                        copyToClipboard(
                          JSON.stringify(data.jsonParse, null, `\t`)
                        );
                      }}
                    >
                      <VscCopy size="20px" />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <CodeView
                codeString={JSON.stringify(data.jsonParse, null, `\t`)}
                styleType={"nord"}
                language={"json"}
                editable={editable}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardContent>
              <Grid spacing={0} container>
                <Grid size={6} item>
                  Comma Seperated Values (CSV)
                </Grid>
                <Grid size={6} item>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      onClick={() => {
                        copyToClipboard(
                          JSON.stringify(data.csvParse, null, `\t`)
                        );
                      }}
                    >
                      <VscCopy size="20px" />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <CodeView
                codeString={data.csvParse}
                styleType={"nord"}
                language={"csv"}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
