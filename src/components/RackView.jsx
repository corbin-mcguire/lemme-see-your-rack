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

export default function RackView() {
  const rack = useRackStore((state) => state.rack);
  const rackSize = useRackStore((state) => state.rackSize);

  return (
    <div className="bg-gray-200 p-4 rounded-lg h-[calc(100vh-8rem)] overflow-y-auto">
      {rack.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No items in the rack yet. Add some using the form!
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-2 relative h-full"
          style={{
            gridTemplateRows: `repeat(${rackSize}, minmax(0, 1fr))`,
          }}
        >
          {rack.map((item) => {
            const textColorClass = getContrastYIQ(item.color);

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: item.color,
                  gridRow: `span ${item.slots}`,
                }}
                className={`${textColorClass} rounded-lg flex flex-col justify-center p-2`}
              >
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
                {/* <div className="text-sm mt-1">
                    <span className="font-medium">{item.slots}U</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
