import { BeatLoader } from "react-spinners";

const Loader = (props: any) => {
  return (
    <BeatLoader
      color={"#3CC186"}
      loading={props.loading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loader;
