import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import BookDiscoveryCard from "./BookDiscoveryCard";

export default function BookDiscoveryCardGroup() {
  const user = useAtomValue(userAtom);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function getBookRecommendations() {
      if (!user) {
        return;
      }

      const books = await requestHandler(
        `/api/books/recommendations/${user.id}`,
        "GET"
      );

      setRecommendations(books);
    }
    getBookRecommendations();
  }, []);

  return recommendations?.length > 0 ? (
    recommendations.map((recommendation, index) => {
      return (
        <div key={recommendation?.id}>
          <BookDiscoveryCard recommendations={recommendation} index={index} />
        </div>
      );
    })
  ) : (
    <div className="d-flex justify-content-center mt-2">
      <h6 className="">No recommendations available.</h6>
    </div>
  );
}
