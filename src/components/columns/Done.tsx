import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { doneSlice } from '../../redux/slice/done';
import ColumnLayout from '../ColumnLayout';


export function DoneColumn() {
  const { done } = useSelector((state: StoreState) => state);
  const {
    actions: { completeStatus, remove, add, updateTextShowed, updateTextNote, updateTitle, },
  } = doneSlice;

  return (
    <>
      <ColumnLayout
      updateTitle={updateTitle}
        title={done.title}
        droppableId='done'
        labelText="Type 'done' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        cardList={done.cardList}
        updateTextShowed={updateTextShowed} 
        updateTextNote={updateTextNote}     
      />
    </>
  );
}
