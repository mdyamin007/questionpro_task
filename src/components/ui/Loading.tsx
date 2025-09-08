import type { FC, PropsWithChildren } from "react";

type PropsType = {
  loading: boolean;
};

const Loading: FC<PropsWithChildren<PropsType>> = ({ loading, children }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default Loading;
