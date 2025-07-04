import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import {
  useGetStatsQuery,
  useDeleteVideoMutation,
} from "../../redux/api/dashboardApi";

const Dashboard = () => {
  const { data: stats, isLoading } = useGetStatsQuery();

  // TODO: Replace static example with API-integrated uploaded videos list
  const uploadedVideos = [
    {
      id: "1",
      title: "Sample Video 1",
      views: 100,
      likes: 25,
      uploadedAt: "01/01/2024",
    },
    {
      id: "2",
      title: "Sample Video 2",
      views: 230,
      likes: 67,
      uploadedAt: "15/02/2024",
    },
  ];

  const handleDelete = (videoId) => {
    // TODO: Integrate delete API
    console.log("Delete video: ", videoId);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "#ffffff",
              boxShadow: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Total Videos
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {isLoading ? "..." : stats?.totalVideos || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "#ffffff",
              boxShadow: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Total Views
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {isLoading ? "..." : stats?.totalViews || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "#ffffff",
              boxShadow: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Total Likes
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {isLoading ? "..." : stats?.totalLikes || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Uploaded Videos */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        My Uploaded Videos
      </Typography>

      <Grid container spacing={3}>
        {uploadedVideos.map((video) => (
          <Grid item xs={12} md={6} key={video.id}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 1,
                border: "1px solid #e0e0e0",
                transition: "0.3s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                👁️ Views: {video.views} &nbsp; | &nbsp; ❤️ Likes: {video.likes}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                display="block"
                gutterBottom
              >
                Uploaded on: {video.uploadedAt}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" size="small">
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(video.id)}
                >
                  Delete
                </Button>
                <Button variant="outlined" size="small">
                  View
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
