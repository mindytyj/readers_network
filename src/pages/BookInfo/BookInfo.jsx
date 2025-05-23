import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { bookAtom } from "../../handlers/bookAtom";
import MainBookInfo from "./MainBookInfo";
import SubBookInfo from "./SubBookInfo";
import UserReview from "../BookReviews/UserReview";
import CommunityReviews from "./CommunityReviews";

export default function BookInfo() {
  const { bookId } = useParams();
  const setBook = useSetAtom(bookAtom);
  const [reviewUpdate, setReviewUpdate] = useState(false);

  useEffect(() => {
    async function getBookInfo() {
      const book = await requestHandler(`/api/books/${bookId}`, "GET");
      setBook(book);
    }
    getBookInfo();
  }, []);

  return (
    <div className="container mt-4 mb-3">
      <MainBookInfo />
      <SubBookInfo />
      <UserReview
        reviewUpdate={reviewUpdate}
        setReviewUpdate={setReviewUpdate}
      />
      <CommunityReviews reviewUpdate={reviewUpdate} />
    </div>
  );
}
