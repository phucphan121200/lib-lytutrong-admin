import axios from "axios";

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const getListUser = async (setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/users", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getUserCart = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/getUserCartAdmin/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}

export const getStatsCartUser = async (id, setNotify) => {
    try {
        const res = await axios.get(BACK_END_URL + "/carts/statsUserBook/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        return res;
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
}
export const handleChangeRole = async (id, value, setNotify) => {
    try {
        const res = await axios.put(BACK_END_URL + "/users/updateRole/" + id, { isAdmin: value }, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
};


export const handleDelete = async (id, setNotify) => {
    // setData(data.filter((item) => item.id !== id));
    try {
        const res = await axios.delete(BACK_END_URL + "/users/delete/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
        //setDataUser(dataUser.filter((item) => item.id !== id));
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
};

export const handleUpdate = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/users/update/" + id, data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
            setOpenModal(false)
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
};

export const handleUserUpdate = async (id, data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/users/update/" + id, data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
            setOpenModal(false)
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
};

export const handleUpdatePassword = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.put(BACK_END_URL + "/users/updatePassword", data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
            setOpenModal(false)
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
};

export const handleCreate = async (data, setNotify, setOpenModal) => {
    try {
        const res = await axios.post(BACK_END_URL + "/users/createUser/", data, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        if (res.data.success == true) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "success",
            });
            setOpenModal(false)
        }
        if (res.data.success == false) {
            setNotify({
                isOpen: true,
                message: res.data.msg,
                type: "error",
            });
        }
    } catch (err) {
        setNotify({
            isOpen: true,
            message: "Lỗi hệ thống: " + err,
            type: "error",
        });
    }
};