import { Card, CardContent, Stack } from "@mui/material"
import MessageCard from "./MessageCard"

export default function MessageList(props) {
  return (
    <Stack spacing={3}>
      <h1>Messages</h1>
      <Card>
        <CardContent style={{maxHeight: "65vh", overflow: "hidden", padding: "10px", overflowY: "scroll"}}>
          {props.msgList.map((dat, idx)=><MessageCard idx={idx} msg={dat}/>)}
        </CardContent>
      </Card>
    </Stack>
  )
}