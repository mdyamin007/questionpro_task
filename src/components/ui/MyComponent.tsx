import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type FC,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";
import MyButton from "./MyButton";

const MyComponent: FC<PropsWithChildren> = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
    console.log("Button clicked");
  };

  // Function to modify children recursively
  const modifyChildren = (child: ReactNode, index: number): ReactNode => {
    if (isValidElement(child)) {
      const childElement = child as ReactElement<{
        onClick?: MouseEventHandler;
        className?: string;
        children?: ReactNode;
      }>;

      if (childElement.type === MyButton) {
        return cloneElement(childElement, {
          onClick: index === 0 ? incrementCounter : childElement.props.onClick,
          className: `${
            index === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
          } ${childElement.props.className || ""}`,
        });
      }

      if (childElement.props.children) {
        return cloneElement(childElement, {
          children: Children.map(
            childElement.props.children,
            (nestedChild, nestedIndex) =>
              modifyChildren(nestedChild, nestedIndex)
          ),
        });
      }
    }

    return child;
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-600 text-sm">
        Hey! you have clicked me {counter} times
      </p>
      <div>
        {Children.map(children, (child, index) => modifyChildren(child, index))}
      </div>
    </div>
  );
};

export default MyComponent;
