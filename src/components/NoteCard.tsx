import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { StoreDispatch } from "../redux/store";
import { INoteCardProps } from "../types";



const NoteCard: React.FC<INoteCardProps> = ({
    noteText,
    draggableId,
    id, 
    index, 
    isFinished, 
    isTextShowed, 
    updatedAt, 
    createdAt,              
    text,        
    removeHandler,
    completedHandler,
    updateTextShowed,
    updateTextNote,
  }) => {
  
  const dispatch = useDispatch<StoreDispatch>();

  
  return (
      <Draggable key={id} draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <ListItem
            sx={{
              transition: ".3s ease background-color",
              color: snapshot.isDragging ? "#fff" : "#989898",
              bgcolor: snapshot.isDragging ? "#989898" : "#fff",
              position: "relative",
              border: "1px solid #989898",
              my: 1,
              borderRadius: "3px",
              "& .MuiTypography-root": {
                display: "flex",
                alignItems: "center",
              },
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ListItemText
              sx={{
                textDecoration: isFinished ? "line-through" : "none",
                wordBreak: "break-word",
              }}
            >
              <IconButton
                sx={{ p: 1, mr: 1 }}
                onClick={() =>
                  dispatch(
                    updateTextShowed({
                      id,
                      isTextShowed: !isTextShowed,
                      
                    })
                  )
                }
              >
                <ArrowDownwardIcon
                  sx={{
                    color: snapshot.isDragging ? "#fff" : "#000",
                    transform: !isTextShowed ? "rotate(180deg)" : "",
                  }}
                />
              </IconButton>

              <Box
                component="span"
                width="100%"
                position="absolute"
                top="0"
                fontSize=".7rem"
              >
                {updatedAt ? "Updated" : "Created"} at:{" "}
                {updatedAt || createdAt}
              </Box>

              <Box component="span" width="100%">
                {text}
              </Box>

              <Box display="flex" component="span">
                <IconButton
                  onClick={() => dispatch(removeHandler(id))}
                >
                  <DeleteIcon
                    sx={{
                      color: snapshot.isDragging ? "#fff" : "#000",
                    }}
                  />
                </IconButton>
                <Checkbox
                  edge="end"
                  value={isFinished}
                  checked={isFinished}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={() =>
                    dispatch(
                      completedHandler({
                        isFinished: !isFinished,
                        id,
                        updatedAt: new Date().toLocaleString(),
                      })
                    )
                  }
                />
              </Box>
            </ListItemText>
            <Collapse in={isTextShowed}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={noteText}
                onChange={
                  (event) =>  dispatch(
                    updateTextNote( 
                     event.target.value,
                    )
                )
              }
              />
            </Collapse>
          </ListItem>
        )}
      </Draggable>
)};
export default NoteCard;






      