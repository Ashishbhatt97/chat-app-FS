import { Group, Person } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useMeQuery } from "../../services/api";
import { useJoinMutation } from "../../services/group-api";
import { useAppSelector } from "../../store/store";

const GroupCard = ({
  group,
}: {
  group: {
    _id: string;
    name: string;
    admin: string;
    privacy: string;
    members: string[];
    isPublic: boolean;
  };
}) => {
  const [join, { isLoading }] = useJoinMutation();
  const { isAuthenticated } = useAppSelector(
    (state: { auth: any }) => state.auth
  );
  const { data } = useMeQuery(undefined, { skip: !isAuthenticated });

  const joinGroupHandler = async () => {
    try {
      if (data?.data._id) {
        const response = await join({
          groupId: group._id,
          userId: data.data._id,
        });

        if (response.data) {
          toast.success("Group joined successfully!");
          console.log("Group joined successfully!");
        }
      }
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 350, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <div style={{ marginLeft: "15px" }} className="flex items-center">
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }} />
        <CardHeader title={group.name} />
      </div>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          display="flex"
          alignItems="center"
        >
          <Person fontSize="small" sx={{ mr: 1 }} />
          Admin: {group.admin}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          display="flex"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Group fontSize="small" sx={{ mr: 1 }} />
          Members: {group.members.length}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color={group.privacy === "PUBLIC" ? "success" : "warning"}
          sx={{ mt: 2, textTransform: "none", borderRadius: 2 }}
          onClick={joinGroupHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : group.privacy === "PUBLIC" ? (
            "Join Group"
          ) : (
            "Request to Join"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
