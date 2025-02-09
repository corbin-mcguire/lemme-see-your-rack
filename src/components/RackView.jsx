import useRackStore from "../store/rackStore";

export default function RackView() {
  const rack = useRackStore((state) => state.rack);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-gray-200 p-4 rounded-lg">
        <div className="space-y-2">
          {rack.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: item.color,
                height: `${item.slots * 1.75}rem`, // Each U is 1.75rem tall
              }}
              className="relative w-full rounded-md shadow-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 p-3">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium hover:underline"
                >
                  {item.name}
                </a>
                <div className="text-white text-sm">
                  <span>{item.slots}U</span>
                  <span className="mx-2">•</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rack.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No items in the rack yet. Add some using the form below!
          </div>
        )}
      </div>
    </div>
  );
}
