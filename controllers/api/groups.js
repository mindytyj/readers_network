const { pool } = require("../../config/database");

async function getGroups(req, res) {
  try {
    const groups = await pool.query(
      "SELECT groups.id, groups.group_name, groups.group_description, groups.created_date, COUNT(group_members.user_id) AS members FROM groups LEFT JOIN group_members ON groups.id = group_members.group_id GROUP BY groups.id"
    );

    if (!groups) throw new Error("There are no groups available.");

    res.status(200).json(groups.rows);
  } catch {
    res.status(400).json("Unable to retrieve groups.");
  }
}

async function addGroup(req, res) {
  try {
    const userId = req.params.userId;
    const data = req.body.groupData;

    const addGroup = await pool.query(
      "INSERT INTO groups (group_name, group_description) VALUES ($1, $2) RETURNING groups.id",
      [data.groupName, data.groupDesc]
    );

    if (addGroup.rowCount == 0)
      throw new Error(
        "Unable to retrieve group id. Failed to create a new group."
      );

    const groupId = addGroup.rows[0].id;

    const addMember = await pool.query(
      "INSERT INTO group_members (group_id, user_id, creator, moderator) VALUES ($1, $2, $3, $4)",
      [groupId, userId, true, true]
    );

    if (addMember.rowCount == 0) throw new Error("Unable to add group member.");

    const addGeneralTopic = await pool.query(
      "INSERT INTO discussion_topics (group_id, topic_name) VALUES ($1, $2)",
      [groupId, "General"]
    );

    if (addGeneralTopic.rowCount == 0)
      throw new Error("Unable to add General discussion topic.");

    const addAnnouncementTopic = await pool.query(
      "INSERT INTO discussion_topics (group_id, topic_name) VALUES ($1, $2)",
      [groupId, "Announcement by Staff"]
    );

    if (addAnnouncementTopic.rowCount == 0)
      throw new Error("Unable to add Announcement discussion topic.");

    res.status(200).json("Successfully added group.");
  } catch {
    res.status(400).json("Unable to add group.");
  }
}

async function searchGroup(req, res) {
  try {
    const search = "%" + req.body.groupSearch.toLowerCase() + "%";
    const groups = await pool.query(
      "SELECT groups.id, groups.group_name, groups.group_description, groups.created_date, COUNT(group_members.user_id) AS members FROM groups LEFT JOIN group_members ON groups.id = group_members.group_id WHERE lower(groups.group_name) LIKE ($1) OR lower(groups.group_description) LIKE ($1) GROUP BY groups.id",
      [search]
    );

    if (!groups)
      throw new Error("There are no group(s) found with the given search.");

    res.status(200).json(groups.rows);
  } catch {
    res.status(400).json("Unable to search for the group(s).");
  }
}

async function getGroupInfo(req, res) {
  const groupId = req.params.groupId;
  try {
    const group = await pool.query(
      "SELECT groups.id, groups.group_name, groups.group_description, groups.created_date, COUNT(group_members.user_id) AS members FROM groups LEFT JOIN group_members ON groups.id = group_members.group_id WHERE groups.id = ($1) GROUP BY groups.id",
      [groupId]
    );
    res.json(group.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve group information.");
  }
}

async function getJoinStatus(req, res) {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const member = await pool.query(
      "SELECT user_id, creator FROM group_members WHERE group_id = ($1) AND user_id = ($2)",
      [groupId, userId]
    );

    res.status(200).json(member.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve user's join status.");
  }
}

async function joinGroup(req, res) {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const addMember = await pool.query(
      "INSERT INTO group_members (group_id, user_id, creator, moderator) VALUES ($1, $2, $3, $4)",
      [groupId, userId, "false", "false"]
    );

    if (addMember.rowCount == 0)
      throw new Error("Unable to add group member. Failed to join group.");

    res.status(200).json("Successfully joined group.");
  } catch {
    res.status(400).json("Unable to join group.");
  }
}

async function leaveGroup(req, res) {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    await pool.query(
      "DELETE FROM group_members WHERE group_id = ($1) AND user_id = ($2)",
      [groupId, userId]
    );

    res.status(200).json("Successfully left group.");
  } catch {
    res.status(400).json("Unable to leave group.");
  }
}

async function deleteGroup(req, res) {
  try {
    const groupId = req.params.groupId;

    await pool.query("DELETE FROM groups WHERE id = ($1)", [groupId]);

    res.status(200).json("Successfully deleted group.");
  } catch {
    res.status(400).json("Unable to delete group.");
  }
}

module.exports = {
  getGroups,
  addGroup,
  searchGroup,
  getGroupInfo,
  getJoinStatus,
  joinGroup,
  leaveGroup,
  deleteGroup,
};
