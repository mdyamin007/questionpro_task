type PropsType = {
  onClick?: React.MouseEventHandler;
  className?: string;
  children?: React.ReactNode;
};

function MyButton({ className, onClick, children }: PropsType) {
  return (
    <button
      className={`px-4 py-2 rounded cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MyButton;
