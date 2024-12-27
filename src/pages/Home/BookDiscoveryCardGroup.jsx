import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import BookDiscoveryCard from "./BookDiscoveryCard";

export default function BookDiscoveryCardGroup() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function getBookRecommendations() {
      const books = await requestHandler("/api/books/recommendations", "GET");

      setRecommendations(books[0]);
    }
    getBookRecommendations();
  }, []);

  return <BookDiscoveryCard recommendations={recommendations} />;
}
