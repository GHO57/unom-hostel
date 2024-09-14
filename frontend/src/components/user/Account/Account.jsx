import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Paper, CircularProgress } from '@mui/material';

const MyAccount = () => {
    const user = useSelector((state) => state.user.user[0]);
    const { loading, error } = useSelector((state) => state.user);

    
    const [email] = useState(user.email);
     
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h4">My Details</Typography>
            <Paper className="p-4">     
                <Typography variant="h6">Email: {email}</Typography>
            </Paper>
        </div>
    );
};

export default MyAccount;
