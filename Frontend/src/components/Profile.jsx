import { useGetProfileQuery } from "../../redux/api/profileApi";
import {
  Skeleton,
  Stack,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <Box sx={{ p: 4, mt: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={208}
          sx={{ borderRadius: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: -8 }}>
          <Skeleton variant="circular" width={128} height={128} />
        </Box>
        <Skeleton width={180} height={40} sx={{ mt: 3 }} />
        <Skeleton width={300} height={30} sx={{ mt: 2 }} />
        <Skeleton width={400} height={60} sx={{ mt: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", px: 4, mt: 6 }}>
      {/* Cover Image */}
      <Box
        sx={{
          position: "relative",
          height: 208,
          borderRadius: 3,
          overflow: "hidden",
          mb: 10,
          boxShadow: 2,
        }}
      >
        <img
          src={data?.profile?.coverImage || ""}
          alt="cover"
          className="w-full h-full object-cover"
        />
        <Avatar
          src={data?.profile?.profilePicture || ""}
          sx={{
            width: 128,
            height: 128,
            position: "absolute",
            bottom: -64,
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
            boxShadow: 3,
          }}
        />
      </Box>

      {/* Profile Content */}
      <Box sx={{ mt: 10, maxWidth: 900, mx: "auto", px: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={600} color="primary.main">
            {data?.profile?.userDetail.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data?.profile?.userDetail.email}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom fontWeight={600}>
          About Me
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {data?.profile?.description || "No description"}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "#f5f5f5",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">🎬</Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Total Videos
              </Typography>
              <Typography variant="body2">12</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "#f5f5f5",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">👁️‍🗨️</Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Watched Videos
              </Typography>
              <Typography variant="body2">34</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "#f5f5f5",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">🧾</Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                To-Do Tasks
              </Typography>
              <Typography variant="body2">5 Pending</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={() => navigate("/edit-profile")}
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            ✏️ Edit Profile
          </Button>
          <Button
            onClick={() => navigate("/change-password")}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            🔐 Change Password
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
