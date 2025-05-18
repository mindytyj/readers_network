import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { ReactReader } from "react-reader";
import { useNavigate, useParams } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function ReadEBook() {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [eBookAccess, seteBookAccess] = useState([]);
  const [location, setLocation] = useState(0);
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    async function geteBookAccess() {
      try {
        const access = await requestHandler(
          `/api/ebooks/${bookId}/access/${user.id}`,
          "GET"
        );

        seteBookAccess(access);

        if (access.length === 0) {
          return navigate("/");
        }
      } catch {
        console.error("Failed to retrieve user's ebook access.");
      }
    }
    geteBookAccess();
  }, []);

  return (
    <div className="container eBook">
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url="/alice.epub"
        epubInitOptions={{
          openAs: "epub",
        }}
        epubOptions={{
          allowPopups: true,
          allowScriptedContent: true,
        }}
      />
    </div>
  );
}
