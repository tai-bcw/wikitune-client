import { Box, Card, Stack, CardContent, Grid2 as Grid } from "@mui/material";

function MessageChip({role, content}) {
  return (
    <Box style={{marginTop: "15px"}}>
    <Stack spacing={2}>
        <div style={{fontWeight:"700", fontSize: "20px"}}>
          Role
        </div>
        <Box>
          {role}
        </Box>
        
        <div style={{fontWeight:"700", fontSize: "20px"}}>
          Content
        </div>
        <Box>
          {content}
        </Box>
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