import LoaderCard from "@/components/common/LoaderCard";
import range from "./range";

const genLoaders = (n: number) =>
  range(n).map((i) => {
    return (
      <div key={i}>
        <LoaderCard />
      </div>
    );
  });

export default genLoaders;
