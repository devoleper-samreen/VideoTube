import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';

const Dashboard = () => {

    // Dynamic Dashboard (Uncomment when needed)
    /*
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const res = await axios.get('/api/my-videos');
          setVideos(res.data);
        } catch (err) {
          console.error('Error fetching videos:', err);
        }
      };
      fetchVideos();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`/api/delete-video/${id}`);
        setVideos(videos.filter(video => video._id !== id));
      } catch (err) {
        console.error('Error deleting video:', err);
      }
    };
    */

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Cards */}
            <Grid container spacing={2} className="mb-6">
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Videos</Typography>
                            <Typography variant="h4">5</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Views</Typography>
                            <Typography variant="h4">300</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Likes</Typography>
                            <Typography variant="h4">75</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <h2 className="text-xl font-bold mb-4">My Uploaded Videos</h2>
            <div className="space-y-4">
                <div className="border p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Sample Video 1</h2>
                        <p className="text-sm text-gray-600">Views: 100 | Likes: 25</p>
                        <p className="text-sm text-gray-500">Uploaded on: 01/01/2024</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="small">Edit</Button>
                        <Button variant="contained" color="error" size="small">Delete</Button>
                        <Button variant="outlined" size="small">View</Button>
                    </div>
                </div>
                <div className="border p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Sample Video 2</h2>
                        <p className="text-sm text-gray-600">Views: 200 | Likes: 50</p>
                        <p className="text-sm text-gray-500">Uploaded on: 02/01/2024</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="small">Edit</Button>
                        <Button variant="contained" color="error" size="small">Delete</Button>
                        <Button variant="outlined" size="small">View</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
