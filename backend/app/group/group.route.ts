import { Router } from "express";
import * as groupController from "./group.controller";
import * as groupValidator from "./group.validation";
import { catchError } from "../common/middleware/cath-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router.get("/joined", roleAuth(["USER"]), groupController.getJoinedGroups);
router.get("/:id", groupController.getGroupById);
router.get("/", groupController.getAllGroup);
router.delete("/:id", groupController.deleteGroup);
router.post(
  "/",
  groupValidator.createGroup,
  catchError,
  groupController.createGroup
);
router.put(
  "/:id",
  groupValidator.updateGroup,
  catchError,
  groupController.updateGroup
);
router.post("/:id/join", catchError, groupController.joinGroup);
router.post(
  "/:id/add-member",
  groupValidator.addMember,
  catchError,
  groupController.addMembers
);
router.put(
  "/:id/make-admin",
  groupValidator.makeAdmin,
  catchError,
  groupController.makeAdmin
);
router.put(
  "/:id/remove-admin",
  groupValidator.removeAdmin,
  catchError,
  groupController.removeAdmin
);

export default router;
