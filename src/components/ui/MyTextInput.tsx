type PropsType = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

function MyTextInput({ label, value, onChange, className }: PropsType) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={[
          "border border-gray-300 rounded px-2 py-1",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "w-1/2",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}

export default MyTextInput;
