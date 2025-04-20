import { useAtomValue } from "jotai";
import { groupAtom } from "../../handlers/groupAtom";

export default function SubGroupInfo() {
  const group = useAtomValue(groupAtom);

  return (
    <div className="d-flex align-items-center mt-4 mb-3">
      <div className="row">
        <div className="col-auto mt-4 mb-3">
          <div className="flex-shrink-0">
            <div>
              <h5>Group Description</h5>
            </div>
            <div>
              <p>{group.group_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
