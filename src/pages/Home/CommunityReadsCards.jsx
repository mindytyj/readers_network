import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import BookDiscoveryCard from "./BookDiscoveryCard";

export default function CommunityReadsCards() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function getCommunityReads() {
      const books = await requestHandler(`/api/community/reads`, "GET");

      setRecommendations(books);
    }
    getCommunityReads();
  }, []);

  return recommendations?.length > 0 ? (
    recommendations.map((recommendation) => {
      return (
        <div key={recommendation?.id}>
          <BookDiscoveryCard recommendations={recommendation} />
        </div>
      );
    })
  ) : (
    <div className="d-flex justify-content-center mt-2">
      <h6 className="">No recent community reads available.</h6>
    </div>
  );
}
