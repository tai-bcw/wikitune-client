import { Box, Card, Stack, CardContent, Grid2 as Grid, TextField } from "@mui/material";

function MessageChip({role, content}) {
  return (
    <Box style={{marginTop: "15px"}}>
    <Stack spacing={2}>
        <TextField
          label={"Role"}
          value={role}
        ></TextField>
        
        <TextField
          label={"Content"}
          multiline={true}
          value={content}
        ></TextField>
    </Stack>
    </Box>
  )
}

export default function MessageCard(props) {
  return (
    <Card>
      <CardContent>
      <Stack spacing={2}>
      <Grid container>
        <Grid size={1} item>
          <div style={{color:"#AAAAAA", fontSize: "50px"}}>
            {props.idx + 1}
          </div>
        </Grid>
        <Grid size={11} item>
          <Stack spacing={3}>
          {
            props.msg.messages.map((dat)=><MessageChip {...dat}/>)
          }
          </Stack>
        </Grid>
      </Grid>
      </Stack>
      </CardContent> 
    </Card>
  )
}