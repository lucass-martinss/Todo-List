import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { todoSlice } from '../../redux/slice/todo';
import ColumnLayout from '../ColumnLayout';

export function ToDoColumn() {
  const { todo } = useSelector((state: StoreState) => state);
  const {
    actions: { completeStatus, remove, add, updateTextShowed, updateTextNote,updateTitle, },
  } = todoSlice;

  return (
      <ColumnLayout
        updateTitle={updateTitle}
        title={todo.title}
        droppableId='todo'
        labelText="Type 'to do' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        cardList={todo.cardList}
        updateTextShowed={updateTextShowed}
        updateTextNote={updateTextNote}
        
      />
    
  );
}
