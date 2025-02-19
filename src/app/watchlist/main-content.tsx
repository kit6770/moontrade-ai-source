import { getPlatformInfo } from "@/lib/getPlatformInfo";
import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  AvatarGroup,
  Rating,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { BaseTooltip } from "@/components/ToolTip";
import XIcon from '@mui/icons-material/X';

export default function WatchListMainContent({
  setPlatImportOpen,
}: {
  setPlatImportOpen: (value: boolean) => void;
}) {
  const isMobile = getPlatformInfo()?.isMobile;

  const { data: selectedWatchKOL } = useSWR("selectedWatchKOL");
  const { trigger: setSelectedWatchKOL } = useSWRMutation("selectedWatchKOL");

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt1", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich1", 237, 9.0, 37, 4.3),
    createData("Eclair1", 262, 16.0, 24, 6.0),
    createData("Cupcake1", 305, 3.7, 67, 4.3),
    createData("Gingerbread1", 356, 16.0, 49, 3.9),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("winRate");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (index: string) => {
    setSelectedWatchKOL(index === selectedWatchKOL ? "" : index);
  };

  const handleDelete = (id: string) => {
    // setData((prevData) => prevData.filter((row) => row.id !== id));
    alert(id);
  };

  return (
    <div
      className={classNames(
        "relative flex flex-auto flex-col gap-[16px] pb-[16px] md:pr-[16px]",
        isMobile
          ? "h-full overflow-auto"
          : "overflow-hidden hover:overflow-auto"
      )}
      style={{ height: `calc(100vh - 144px)` }}
    >
      <div className="flex flex-col gap-[16px] rounded-[20px] bg-white">
        <div className="flex flex-row items-center justify-between pt-[16px] px-[16px]">
          <TextField
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{
              width: "268px",
              borderRadius: "8px",
              "& .MuiOutlinedInput-input": {
                borderColor: "#DDDDDD",
                borderRadius: "8px",
              },
            }}
          />
          <div className="flex flex-row items-center gap-[10px]">
            <Button
              variant="contained"
              sx={{
                minWidth: "36px",
                width: "36px",
                height: "36px",
                textTransform: "none",
                color: "black",
                backgroundColor: "#C8FF00",
                borderRadius: "10px",
                fontSize: "14px",
                padding: "0px",
              }}
              onClick={() => setPlatImportOpen(true)}
            >
              <AddIcon />
            </Button>
            <Button
              variant="contained"
              sx={{
                height: "36px",
                textTransform: "none",
                color: "black",
                backgroundColor: "#C8FF00",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            >
              <div className="w-[24px] h-[24px] rounded-full bg-[#373737] flex items-center justify-center mr-[10px]">
                <XIcon htmlColor={"#fff"} sx={{width: "16px", height: "16px"}} />
              </div>
              Import KOLs from X
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  role="checkbox"
                  key={row.name}
                  hover
                  selected={selectedWatchKOL === row?.name}
                  onClick={() => handleRowClick(row?.name)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&.Mui-selected": { backgroundColor: "#FBFFEC" },
                    height: "70px",
                    padding: "0px",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: "0 0 0 16px" }}
                  >
                    <div className="flex flex-row items-center gap-[10px]">
                      <div className="w-[34px] h-[34px] rounded-full bg-[gray]"></div>
                      <div className="flex flex-col">
                        <div className="text-[14px] font-semibold">
                          {row.name}
                        </div>
                        <div className="text-[12px]">@{row.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "0" }}>
                    <AvatarGroup
                      spacing={4}
                      max={6}
                      total={36}
                      sx={{
                        "& .MuiAvatar-root": {
                          width: 24,
                          height: 24,
                          fontSize: "12px",
                        },
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </TableCell>
                  <TableCell sx={{ padding: "0px 16px" }}>
                    <div className="text-[#00B953] text-[14px] font-semibold">
                      +52.37%
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "0" }}>
                    <div className="text-[#000] text-[14px] font-semibold ">
                      3h
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: "0px 16px" }}>
                    <Rating
                      name="simple-controlled"
                      value={5}
                      onChange={(event, newValue) => {
                        // setValue(newValue);
                      }}
                      sx={{ color: "#FF5900", fontSize: "14px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "0 16px 0 0" }}>
                    {selectedWatchKOL === row.name && (
                      <div className="w-[32px] h-[32px] bg-white flex items-center justify-center rounded-[10px] border-[1px] border-[#DDDDDD]">
                        <BaseTooltip title="Remove" placement="top">
                          <IconButton
                            onClick={(e) => {
                              handleDelete(row.name);
                              e.stopPropagation();
                            }}
                            color="secondary"
                          >
                            <DeleteIcon
                              htmlColor="#000"
                              sx={{ width: "16px", height: "16px" }}
                            />
                          </IconButton>
                        </BaseTooltip>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

const headCells = [
  { id: "name", label: "Name", sort: false },
  { id: "calls", label: "Recent Calls(30D)", sort: false },
  { id: "winRate", label: "Win Rate", sort: true },
  { id: "lastActive", label: "Last Active", sort: true },
  { id: "rating", label: "Rating", sort: false },
];

function EnhancedTableHead(props: {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: any;
}) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          // if (headCell?.sort) {
          //   return (
          //     <TableCell
          //       key={headCell.id}
          //       sortDirection={orderBy === headCell.id ? order : false}
          //       // sx={{
          //       //   padding: "10px",
          //       //   lineHeight: "10px",
          //       // }}
          //     >
          //       <TableSortLabel
          //         disabled={headCell.sort}
          //         active={orderBy === headCell.id}
          //         direction={orderBy === headCell.id ? order : "asc"}
          //         onClick={createSortHandler(headCell.id)}
          //       >
          //         {headCell.label}
          //         {orderBy === headCell.id ? (
          //           <Box component="span" sx={visuallyHidden}>
          //             {order === "desc"
          //               ? "sorted descending"
          //               : "sorted ascending"}
          //           </Box>
          //         ) : null}
          //       </TableSortLabel>
          //     </TableCell>
          //   );
          // } else {
          return (
            <TableCell key={headCell.id} sx={{ fontSize: "12px" }}>
              {headCell.label}
            </TableCell>
          );
          // }
        })}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
