import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { groupAtom } from "../../handlers/groupAtom";
import requestHandler from "../../handlers/request-handler";
import DiscussionBoard from "./DiscussionBoard";
import MainGroupInfo from "./MainGroupInfo";
import SubGroupInfo from "./SubGroupInfo";

export default function GroupInfo() {
  const { groupId } = useParams();
  const setGroup = useSetAtom(groupAtom);
  const [joinStatusUpdate, setJoinStatusUpdate] = useState(false);
  const [groupUpdate, setGroupUpdate] = useState(false);

  useEffect(() => {
    async function getGroupInfo() {
      const group = await requestHandler(`/api/groups/${groupId}`, "GET");
      setGroup(group);
    }
    getGroupInfo();
  }, [joinStatusUpdate, groupUpdate]);

  return (
    <div className="container mt-4 mb-3">
      <MainGroupInfo
        groupId={groupId}
        joinStatusUpdate={joinStatusUpdate}
        setJoinStatusUpdate={setJoinStatusUpdate}
        groupUpdate={groupUpdate}
        setGroupUpdate={setGroupUpdate}
      />
      <SubGroupInfo />
      <DiscussionBoard />
    </div>
  );
}
