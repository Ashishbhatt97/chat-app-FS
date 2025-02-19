import { IGroup } from "./group.dto";
import groupSchema from "./group.schema";

export const createGroup = async (data: IGroup, adminId: string) => {
  const groupData = {
    ...data,
    admin: adminId,
    members: [adminId],
    pendingInvites: [],
  };
  const result = await groupSchema.create(groupData);
  return result;
};

export const getAllGroup = async () => {
  const result = await groupSchema.find({}).lean();
  return result;
};

export const getGroupById = async (id: string) => {
  console.log(id);
  const result = await groupSchema.findById(id).lean();
  return result;
};

export const deleteGroup = async (id: string) => {
  const result = await groupSchema.deleteOne({ _id: id });
  return result;
};

export const checkGroupAdmin = async (id: string, groupId: string) => {
  const result = await groupSchema.findOne({ _id: groupId, admin: id });
  return result;
};

export const updateGroup = async (id: string, data: IGroup) => {
  await groupSchema.findOneAndUpdate({ _id: id }, data);
  const result = await getGroupById(id);
  return result;
};

export const addMembers = async (
  groupId: string,
  adminId: string,
  memberId: string
) => {
  if (!memberId) {
    throw new Error("User ID is required.");
  }

  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw new Error("Group not found.");
  }

  if (!group.admin.includes(adminId)) {
    throw new Error("Only admins can add members.");
  }

  const updatedMembers = [...new Set([...group.members, memberId])];

  group.members = updatedMembers;
  await group.save();

  return group;
};

export const removeAdmin = async (groupId: string, adminId: string) => {
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw new Error("Group not found.");
  }

  if (!group.admin.includes(adminId)) {
    throw new Error("Only admins can remove admins.");
  }

  await group.save();
  return group;
};

export const removeMember = async (
  groupId: string,
  adminId: string,
  memberId: string
) => {
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw new Error("Group not found.");
  }

  if (!group.admin.includes(adminId)) {
    throw new Error("Only admins can remove members.");
  }

  group.members = group.members.filter((member: string) => member !== memberId);
  await group.save();

  return group;
};

export const makeAdmin = async (
  groupId: string,
  adminId: string,
  memberId: string
) => {
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw new Error("Group not found.");
  }

  if (!group.admin.includes(adminId)) {
    throw new Error("Only admins can make admins.");
  }

  await group.save();

  return group;
};

export const joinGroup = async (groupId: string, memberId: string) => {
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw new Error("Group not found.");
  }

  if (group.members.includes(memberId)) {
    throw new Error("User is already a member of the group.");
  }

  group.members.push(memberId);
  await group.save();
  return group;
};

export const getJoinedGroups = async (userId: string) => {
  const groups = await groupSchema.find({ members: userId });
  return groups;
};
