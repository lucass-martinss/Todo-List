import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import { inProgressSlice } from '../../redux/slice/inProgress';
import ColumnLayout from '../ColumnLayout';

export function InProgressColumn() {
  const { inProgress } = useSelector((state: StoreState) => state);

  const {
    actions: { completeStatus, remove, add, updateTextShowed, updateTextNote,
      updateTitle },
  } = inProgressSlice;

  return (
    <>
      
      <ColumnLayout
      updateTitle={updateTitle}
        title={inProgress.title}
        droppableId='inProgress'
        labelText="Type 'in progress' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        cardList={inProgress.cardList}
        updateTextShowed={updateTextShowed}
        updateTextNote={updateTextNote}
      />
    </>
  );
}
