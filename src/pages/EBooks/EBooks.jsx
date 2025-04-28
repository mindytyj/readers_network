import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import EBookItem from "../EBooks/EBookItem";

export default function EBooks() {
  const user = useAtomValue(userAtom);
  const [eBooks, seteBooks] = useState([]);

  useEffect(() => {
    async function geteBooks() {
      try {
        const books = await requestHandler(`/api/ebooks/${user.id}`, "GET");

        seteBooks(books);
      } catch {
        console.error("Failed to retrieve ebooks rental list.");
      }
    }
    geteBooks();
  }, []);

  return (
    <div className="container mt-4 mb-4">
      <div className="mb-4">
        <h4>My eBooks Access</h4>
      </div>
      <div className="container border border-primary rounded">
        <div className="list-group mt-3 mb-3 overflow-y-auto groupsContainer rounded-0">
          {eBooks?.length > 0 ? (
            eBooks.map((eBook) => {
              return (
                <div key={eBook?.id}>
                  <EBookItem eBook={eBook} />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">No eBooks access available.</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
