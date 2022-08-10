import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { StoreDispatch } from "../redux/store";
import { IColumnLayoutProps } from "../types";
import ClearIcon from '@mui/icons-material/Clear';
import { OutlinedInput } from "@mui/material";
import "./columns/components.css";

import NoteCard from "./NoteCard";
import { IconButton } from "@mui/material";

const ColumnLayout: React.FC<IColumnLayoutProps> = ({
  removeHandler,
  completedHandler,
  addHandler,
  updateTextShowed,
  updateTextNote,
  updateTitle,
  cardList: selectorState,
  labelText,
  droppableId,
  title,
}) => {
  const [isError, setIsError] = useState({
    isShow: false,
    text: "",
  });
  const [open, setOpen] = useState(false)
  const [insertCard, setInsertCard] = useState(false);
  const [textDescription, setTextDescription] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);

    setIsError({
      isShow: value.length > 200,
      text:
        value.length > 200
          ? "The input value cannot be more than 200 characters"
          : "",
    });
  };

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
    setInsertCard(true);

  };
  const handleInsertCard = () => {
    setInsertCard(true);

  };
  const handleTitleClick = () => {
    setOpen(true);
  }
  const handleEscapeClick = () => {
    setInsertCard(false);
  }
  const handleOnClick = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription));
      setTextDescription("");
      setInsertCard(false);
    }
  };

  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        handleOnClick();
      } else {
        setIsError({
          isShow: true,
          text: "The input value cannot be empty",
        });
      }
    }

  };

  return (
    <Box
      className="column"
      borderRadius={1}
      width="100%"
      sx={{ boxShadow: 2, p: 3 }}
    >
      {open
        ? <OutlinedInput
          className="columnTitle"
          defaultValue={title}

          inputRef={input => input && input.focus()}
          onBlur={event => {
           dispatch(
           updateTitle(event.target.value)) 
           setOpen(false) 
           }
          }
        />

        : <Button
          fullWidth
          onClick={handleTitleClick}>{title}</Button>}
      
      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{
              minHeight: "300px",
              li: {
                flexDirection: "column",
              },
              "& .MuiListItemText-root": {
                width: "100%",
              },
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {selectorState.map(
              (
                {
                  id,
                  text,
                  isFinished,
                  createdAt,
                  updatedAt,
                  isTextShowed,
                  noteText,
                },
                index: number
              ) => (
                <NoteCard
                  key={`note-card-${id}`}
                  isFinished={isFinished}
                  id={id}
                  draggableId={id}
                  text={text}
                  noteText={noteText}
                  checked={isFinished}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  isTextShowed={isTextShowed}
                  index={index}
                  removeHandler={() => removeHandler(id)}
                  updateTextShowed={() =>
                    dispatch(
                      updateTextShowed({
                        id,
                        isTextShowed: !isTextShowed,
                      })
                    )
                  }
                  updateTextNote={(noteText: string) =>
                    dispatch(
                      updateTextNote({
                        id,
                        noteText,
                      })
                    )
                  }
                  completedHandler={() =>
                    dispatch(
                      completedHandler({
                        isFinished: !isFinished,
                        id,
                        updatedAt: new Date().toLocaleString(),
                      })
                    )
                  }
                  value={updatedAt}
                />
              )
            )}
            {!insertCard
              ?
              <Button
                fullWidth
                endIcon={<AddOutlinedIcon />}
                color="secondary"
                onClick={handleInsertCard}>
                Add a card
              </Button>

              : <>
                <TextField

                  inputRef={input => input && input.focus()}
                  fullWidth
                  placeholder={labelText}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  onKeyDown={handleInputKeyDown}
                  value={textDescription}
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={4}
                />
                <Button
                  size="medium"
                  sx={{ my: 1, maxWidth: 200 }}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleOnClick}
                  onKeyDown={({ key }) => key === "Enter" && handleOnClick()}
                  disabled={
                    textDescription.length === 0 || textDescription.length > 200
                  }
                >
                  Add Item
                </Button>
                <IconButton
                  onClick={handleEscapeClick}>
                  <ClearIcon />
                </IconButton>
              </>
            }
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Box>
  );
};
export default ColumnLayout;
