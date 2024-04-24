import { comboType, figType } from "../../Types";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

type EditComboDragProps = {
  comboKey: string;
  combo: comboType;
  figures: figType[];
};

const EditComboDrag: React.FC<EditComboDragProps> = ({
  comboKey,
  combo,
  figures,
}) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return 1;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return 2;
    }

    const column = combo;
    const newFigIds = Array.from(column.figures);
    newFigIds.splice(source.index, 1);
    newFigIds.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, figures: newFigIds };
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section>
        <h4>{combo.name}</h4>
        <Droppable droppableId={comboKey}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {figures.map((fig, index) => (
                <Draggable draggableId={fig._id} index={index}>
                  {(provided) => (
                    <div
                      key={fig._id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-mainlight my-1"
                    >
                      {fig.name}
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
};

export default EditComboDrag;
