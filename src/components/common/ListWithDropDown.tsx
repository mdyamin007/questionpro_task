import MyCard from "../ui/MyCard";

type PropsType<
  T extends { id: number; body: string; title?: string; name?: string }
> = {
  title: string;
  data: T[];
  selectDropdown?: React.ReactNode;
};

function ListWithDropDown<
  T extends { id: number; body: string; title?: string; name?: string }
>({ title, data, selectDropdown }: PropsType<T>) {
  return (
    <div className="mt-4 relative">
      <h4 className="text-xl font-semibold">{title}</h4>

      {/* select dropdown */}
      {selectDropdown && (
        <div className="absolute top-0 left-1/2 right-1/2">
          {selectDropdown}
        </div>
      )}

      {/* list of cards */}
      <div className="flex flex-col gap-4 mt-8">
        {data?.map((item) => (
          <MyCard
            key={item.id}
            title={item.title || item.name || ""}
            description={item.body}
          />
        ))}
      </div>
    </div>
  );
}

export default ListWithDropDown;
