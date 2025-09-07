import MyCard from "../ui/MyCard";

type PropsType = {
  title: string;
};

function ListWithDropDown({ title }: PropsType) {
  return (
    <div className="mt-4 relative">
      <h4 className="text-xl font-semibold">{title}</h4>

      {/* select filter */}
      <div className="absolute left-1/2 right-1/2 top-0">
        <select className="border border-gray-300 rounded p-1">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* list of cards */}
      <div className="flex flex-col gap-4 mt-8">
        <MyCard
          title="Card Title"
          description="This is a description of the card."
        />
        <MyCard
          title="Card Title"
          description="This is a description of the card."
        />
        <MyCard
          title="Card Title"
          description="This is a description of the card."
        />
        <MyCard
          title="Card Title"
          description="This is a description of the card."
        />
      </div>
    </div>
  );
}

export default ListWithDropDown;
