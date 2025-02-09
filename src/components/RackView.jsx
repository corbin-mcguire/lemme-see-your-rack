import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useRackStore from "../store/rackStore";

function getContrastYIQ(hexcolor) {
  // Remove # if present
  hexcolor = hexcolor.replace("#", "");

  // Convert to RGB
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);

  // Calculate YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white based on YIQ ratio
  return yiq >= 128 ? "text-black" : "text-white";
}

function SortableItem({ item }) {
  const removeItem = useRackStore((state) => state.removeItem);
  const textColorClass = getContrastYIQ(item.color);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    backgroundColor: item.color,
    gridRow: `span ${item.slots}`,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${textColorClass} rounded-lg flex space-between items-center align-middle gap-4 p-4 group relative`}
    >
      <div className="flex items-center gap-4 space-between grow">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing rounded hover:bg-black/10 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </div>

        <div className="overflow-hidden text-ellipsis">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg font-semibold hover:underline line-clamp-2 ${textColorClass}`}
          >
            <span className="font-medium">{`${item.slots}U - ${item.name}`}</span>
          </a>
        </div>
      </div>
      <button
        onClick={() => removeItem(item)}
        className="opacity-0 group-hover:opacity-100 transition-opacity rounded bg-black/10 hover:bg-red-600 hover:cursor-pointer px-2 py-1 bg-red-500 text-white self-center"
      >
        Delete
      </button>
    </div>
  );
}

export default function RackView() {
  const rack = useRackStore((state) => state.rack);
  const rackSize = useRackStore((state) => state.rackSize);
  const reorderItems = useRackStore((state) => state.reorderItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = rack.findIndex((item) => item.id === active.id);
      const newIndex = rack.findIndex((item) => item.id === over.id);
      reorderItems(oldIndex, newIndex);
    }
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg h-[calc(100vh-8rem)] overflow-y-auto">
      {rack.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No items in the rack yet. Add some using the form!
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rack.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div
              className="grid grid-cols-1 gap-2 relative h-full"
              style={{
                gridTemplateRows: `repeat(${rackSize}, minmax(min-content, 1fr))`,
              }}
            >
              {rack.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
