import React from 'react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useGetStatsQuery, useDeleteVideoMutation } from "../../redux/api/dashboardApi";

const Dashboard = () => {
    const { data: stats, isLoading } = useGetStatsQuery();


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats */}
            <Grid container spacing={2} className="mb-6">
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Videos</Typography>
                            <Typography variant="h4">
                                {isLoading ? 'Loading...' : stats?.totalVideos}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Views</Typography>
                            <Typography variant="h4">
                                {isLoading ? 'Loading...' : stats?.totalViews}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Likes</Typography>
                            <Typography variant="h4">
                                {isLoading ? 'Loading...' : stats?.totalLikes}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <h2 className="text-xl font-bold mb-4">My Uploaded Videos</h2>
            <div className="space-y-4">
                {/* Example Video */}
                <div className="border p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Sample Video 1</h2>
                        <p className="text-sm text-gray-600">Views: 100 | Likes: 25</p>
                        <p className="text-sm text-gray-500">Uploaded on: 01/01/2024</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="small">Edit</Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete("VIDEO_ID")}
                        >
                            Delete
                        </Button>
                        <Button variant="outlined" size="small">View</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
