import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { createQueryParams } from "../../utils/utils";

const LikeCount = () => {
  const [fetchLikePhrasalVerbCount, doFetchLikePhrasalVerbCount] =
    useFetch(null);
  const [fetchLikeIdiomCount, doFetchLikeIdiomCount] = useFetch(null);

  useEffect(() => {
    const params = createQueryParams({ count: 1 });
    doFetchLikePhrasalVerbCount(`users/phrasal-verbs?${params}`);
    doFetchLikeIdiomCount(`users/idioms?${params}`);
  }, []);
  return (
    <div>
      <div>
        Phrasal verbs :{" "}
        {fetchLikePhrasalVerbCount.loading
          ? "loading..."
          : fetchLikePhrasalVerbCount.data}
      </div>
      <div>
        Idioms :{" "}
        {fetchLikeIdiomCount.loading ? "loading..." : fetchLikeIdiomCount.data}
      </div>
    </div>
  );
};
export default LikeCount;
