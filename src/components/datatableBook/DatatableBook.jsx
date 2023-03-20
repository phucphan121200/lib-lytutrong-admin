import "./datatableBook.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getListBook } from "../../context/bookContext/apiCalls"
import LoadingCircle from "../../components/loadingCircle/LoadingCircle";
import { Button, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Notification from "../../components/alert/Notification";
import Popup from "../popup/popupConfirm/Popup";
import { getCategories } from "../../context/bookContext/apiCalls"
import Moment from 'moment';
import PopupBook from "../popup/popupBook/PopupBook";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const DatatableBook = () => {

    const [dataBook, setDataBook] = useState("")
    const [idBook, setIdBook] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [createUpdate, setCreateUpdate] = useState(0);
    const [category, setCate] = useState("")
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    useEffect(() => {
        (async () => {
            const bookList = await getListBook(setNotify)
            setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
            const cateList = await getCategories(setNotify)
            setCate(cateList?.data?.data)
            setRecord(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
        })()
        return;
    }, [])

    const [record, setRecord] = useState("")

    const handleSearch = (e) => {
        const newData = dataBook.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecord(newData)
    }

    const bookColumns = [
        {
            field: "index", headerName: "STT", width: 60, align: "center"
        },
        { field: "_id", headerName: "Mã sách", width: 150 },
        {
            field: "name",
            headerName: "Tên sách",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        <img className="cellImg" src={params.row.image} alt="avatar" />
                        {params.row.name}
                    </div>
                );
            }
        },
        // {
        //   field: "issuingcompany",
        //   headerName: "NXB",
        //   width: 120,
        // },
        // {
        //     field: "publicationdate",
        //     headerName: "Năm X.bản",
        //     width: 120,
        //     //   renderCell: (params) => {
        //     //     return (
        //     //       <Switch
        //     //         checkedChildren={<CheckOutlined />}
        //     //         unCheckedChildren={<CloseOutlined />}
        //     //         defaultChecked={params.row.isAdmin}
        //     //         onChange={(value) => handleChangeRole(params.row.id, value, setNotify)}
        //     //       // onClick={
        //     //       //   !params.row.isAdmin
        //     //       // }
        //     //       />
        //     //     );
        //     //   },
        //     align: "center"
        // },
        {
            field: "authStock",
            headerName: "Tồn khả dụng",
            width: 120,
            align: "center",
            headerAlign: "center",

        },
        {
            field: "stock",
            headerName: "Tồn vật lý",
            width: 100,
            align: "center",
            headerAlign: "center",

        },
        {
            field: "createdAt",
            headerName: "Thời gian tạo",
            width: 180,
            renderCell: (params) => {
                return (
                    Moment(params.row.createdAt).format('HH:mm:ss, DD/MM/YYYY')
                )
            }
        },
        {
            field: "updatedAt",
            headerName: "Thời gian sửa",
            width: 180,
            renderCell: (params) => {
                return (
                    Moment(params.row.updatedAt).format('HH:mm:ss, DD/MM/YYYY')
                )
            }
        },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Thao tác",
            width: 220,
            renderCell: (params) => {
                return (
                    <div className="cellAction">

                        <div className="viewButton" onClick={() => {
                            setModalUpdate(true)
                            setIdBook(params.row)
                            setCreateUpdate(3)
                        }}
                        >Tăng tồn</div>
                        <div
                            className="editButton"
                            onClick={() => {
                                setModalUpdate(true)
                                setIdBook(params.row)
                                setCreateUpdate(2)
                            }}
                        >
                            Cập nhật
                        </div>
                        <div
                            className="deleteButton"
                            onClick={() => {
                                setModalOpen(true)
                                setIdBook(params.row._id)
                            }}
                        >
                            Xóa
                        </div>
                    </div>
                );
            },
            headerAlign: "center",
            align: "center"
        },
    ];
    return (
        <div className="datatablee">
            <div className="datatableTitle">
                Danh sách đầu sách
                <div style={{ display: "flex" }}>
                    {/* <TextField
                        size="small"
                        label="Tìm kiếm tên đầu sách"
                        onChange={handleSearch}
                        style={{ marginRight: "10px" }}
                    ></TextField> */}
                    <FormControl size="small" sx={{ marginRight: "10px" }}
                        variant="outlined"
                        id="outlined-required"
                        onChange={handleSearch}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Tìm kiếm tên sách</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Tìm kiếm tên sách"
                        />
                    </FormControl>
                    <div className="link"
                        onClick={() => {
                            setModalUpdate(true)
                            setCreateUpdate(1)

                        }}
                    >
                        Thêm mới
                    </div>
                </div>
            </div>
            {
                record ?
                    <DataGrid
                        className="datagrid"
                        rows={record}
                        getRowId={(dataBook) => dataBook._id}
                        columns={bookColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        disableSelectionOnClick
                        disableColumnMenu
                        getRowClassName={(params) => { if (params.row.stock == 0) { return "get-red" } }}
                    />
                    :
                    <LoadingCircle />
            }
            <div className="modal">
                {modalOpen &&
                    <Popup setOpenModal={setModalOpen}
                        title="Bạn có muốn xóa đầu sách này?"
                        data={idBook}
                        isPopup={1}
                        setNoti={setNotify}
                        setDataUser={setRecord}
                    />}
            </div>
            <div className="modalupdate">
                {modalUpdate &&
                    <PopupBook
                        setOpenModal={setModalUpdate}
                        createUpdate={createUpdate}
                        data={idBook}
                        category={category}
                        setNoti={setNotify}
                        setDataBook={setRecord}
                    />}
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
};

export default DatatableBook;
