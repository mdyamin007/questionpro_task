type PropsType = {
  title: string;
  description?: string;
};

function MyCard({ title, description }: PropsType) {
  return (
    <div className="rounded border border-gray-300 p-2 flex flex-col gap-3 max-w-xl">
      <h5 className="text-blue-900 font-semibold text-lg">{title}</h5>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default MyCard;
