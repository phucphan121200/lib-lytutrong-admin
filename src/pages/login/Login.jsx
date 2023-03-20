import React, { useContext, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.scss";
import Notification from "../../components/alert/Notification";

const Login=()=>{
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const handleLogin = (e) => {
        e.preventDefault();
        login({ phone, password }, dispatch, setNotify);
      };
    const paperStyle={display:"flex", flexDirection: "column", padding : 50, width:280 }
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'30px 0', color: '#3CB371'}
    return(
        <Grid style={{height:"100vh", display: "flex", justifyContent: "center", alignItems:"center"}}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Đăng nhập</h2>
                </Grid>
                <TextField label='Số điện thoại' placeholder='Nhập số điện thoại' fullWidth required onChange={(e) => setPhone(e.target.value)}/>
                <TextField label='Mật khẩu' placeholder='Nhập mật khẩu' type='password' fullWidth required onChange={(e) => setPassword(e.target.value)}/>
                <Button type='submit' variant="contained" style={btnstyle} fullWidth onClick={handleLogin} disabled={isFetching}>Đăng nhập</Button>
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </Grid> 
    )
}

export default Login