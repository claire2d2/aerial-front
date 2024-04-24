import { comboType, figType } from "../../Types";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

type EditComboDragProps = {
  comboKey: string;
  combo: comboType;
  figures: figType[];
};

const onDragEnd = () => {
  // TODO reorder tasks
};

const EditComboDrag: React.FC<EditComboDragProps> = ({
  comboKey,
  combo,
  figures,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={comboKey}>
        {(provided) => (
          <section>
            <h4>{combo.name}</h4>

            <div ref={provided.innerRef} {...provided.droppableProps}>
              {figures.map((fig, index) => (
                <Draggable key={fig._id} draggableId={fig._id} index={index}>
                  {(provided) => (
                    <div
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
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EditComboDrag;
