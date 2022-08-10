import { AnyAction } from '@reduxjs/toolkit';

export interface INoteCard {
  id: string;
  text: string;
  noteText: string;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
  isTextShowed: boolean;
}

export type TActionSlice = Omit<INoteCard, 'text'>;
export type TUpdateTextShowed = Pick<TActionSlice, 'isTextShowed' | 'id' >;
export type TUpdateTextNote = Pick<TActionSlice, 'noteText' | 'id'>;
export type TCompletedHandler = Pick<TActionSlice, 'isFinished' | 'id' | 'updatedAt'>;

export interface IColumnState {
  title: string;
  cardList: INoteCard[];
};

export interface IColumnLayoutProps {
  title: string;
  updateTitle:(v: string) => AnyAction;
  labelText: string;
  addHandler: (v: string) => AnyAction;
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: TCompletedHandler) => AnyAction;
  cardList: INoteCard[];
  droppableId: string;
  updateTextShowed: (v: TUpdateTextShowed) => AnyAction;
  updateTextNote: (v: TUpdateTextNote) => AnyAction;

};
export interface INoteCardProps{
  
  noteText: string;
  draggableId: string;
  id: string; 
  index: number; 
  updatedAt: string;
  createdAt: string;              
  text: string;
  isFinished: boolean; 
  isTextShowed: boolean;
  checked: boolean;  
  value: string; 
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: TCompletedHandler) => AnyAction;
  updateTextShowed: (v: TUpdateTextShowed) => AnyAction;
  updateTextNote: (v: string) => AnyAction;
};

