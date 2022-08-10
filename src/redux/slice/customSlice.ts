import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  TCompletedHandler,
  TUpdateTextShowed,
  INoteCard,
  TUpdateTextNote,
} from "../../types";

type PAction<P> = PayloadAction<P>;
export interface IColumnState {
  title: string;
  cardList: INoteCard[];
}


export const createColumnSlice = (name: string) => {
  const {
    actions: {
      add,
      remove,
      completeStatus,
      reorder,
      update,
      updateTextShowed,
      updateTextNote,
      updateTitle,
    },
    reducer,
  } = createSlice({
    name,
    initialState:{
      title: name,
      cardList: [],
    },

    reducers: {
      add: {
        reducer: (state: IColumnState, action: PAction<INoteCard>) => {
          state.cardList.push(action.payload);
        },
        prepare: (text: string) => ({
          payload: {
            id: uuidv4(),
            text,
            noteText: "",
            isFinished: false,
            createdAt: new Date().toLocaleString(),
            isTextShowed: false,
          } as INoteCard,
        }),
      },
      update(state: IColumnState, action: any) {
        state.cardList.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      remove(state: IColumnState, action: PAction<string>) {
        const index = state.cardList.findIndex(({ id }: any) => id === action.payload);
        state.cardList.splice(index, 1);
      },
      updateTitle(state: IColumnState, action: PAction<string>) {
        state.title = action.payload
      },
      completeStatus(state: IColumnState, action: PAction<TCompletedHandler>) {
        const index = state.cardList.findIndex(
          ({ id }: any) => id === action.payload.id
        );
        state.cardList[index].isFinished = action.payload.isFinished;
        state.cardList[index].updatedAt = action.payload.updatedAt;
      },
      updateTextShowed(state: IColumnState, action: PAction<TUpdateTextShowed>) {
        const index = state.cardList.findIndex(
          ({ id }: any) => id === action.payload.id
        );
        state.cardList[index].isTextShowed = action.payload.isTextShowed;
      },
      updateTextNote(state: IColumnState, action: PAction<TUpdateTextNote>) {
        const index = state.cardList.findIndex(
          ({ id }: any) => id === action.payload.id
        );
        state.cardList[index].noteText = action.payload.noteText;
      },
      reorder(state: IColumnState, action: any) {
        const [removed] = state.cardList.splice(action.payload.source.index, 1);
        state.cardList.splice(action.payload.destination.index, 0, removed);
      },
    },
  });

  return {
    actions: {
      add,
      remove,
      completeStatus,
      reorder,
      update,
      updateTextShowed,
      updateTextNote,
      updateTitle,
    },
    reducer,
  };
};
