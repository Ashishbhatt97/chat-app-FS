import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { Group, People, Chat, Message } from "@mui/icons-material";
import { useMeQuery } from "../services/api";
import { useAppSelector } from "../store/store";

interface AnalyticsData {
  totalGroups: number;
  groupUsers: number;
  totalUsers: number;
  totalMessages: number;
}

const Profile = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useMeQuery(undefined, { skip: !isAuthenticated });

  if (isLoading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography textAlign="center">Profile not found!</Typography>
      </Box>
    );
  }

  const analytics: AnalyticsData = {
    totalGroups: 12,
    groupUsers: 145,
    totalUsers: 500,
    totalMessages: 2342,
  };

  const analyticsItems = [
    {
      label: "Total Groups",
      value: analytics.totalGroups,
      icon: <Group fontSize="large" color="primary" />,
    },
    {
      label: "Group Users",
      value: analytics.groupUsers,
      icon: <People fontSize="large" color="secondary" />,
    },
    {
      label: "Total Users",
      value: analytics.totalUsers,
      icon: <Chat fontSize="large" color="success" />,
    },
    {
      label: "Total Messages",
      value: analytics.totalMessages,
      icon: <Message fontSize="large" color="error" />,
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Box display="flex" alignItems="center" gap={2} sx={{ marginBottom: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
          {data.data.name[0]}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {data.data.name}
          </Typography>
          <Typography variant="body1" color="gray">
            {data.data.email}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
          User Analytics
        </Typography>
        <Grid container spacing={3}>
          {analyticsItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ marginTop: 1 }}
                  >
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
