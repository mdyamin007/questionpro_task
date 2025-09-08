import MyButton from "../components/ui/MyButton";
import MyComponent from "../components/ui/MyComponent";

function ComponentPage() {
  return (
    <MyComponent>
      <div className="flex items-center gap-4">
        <MyButton>Clickable Button</MyButton>
        <MyButton>Dumb Button</MyButton>
      </div>
    </MyComponent>
  );
}

export default ComponentPage;
