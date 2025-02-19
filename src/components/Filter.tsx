import { Button, Modal, Box } from "@mui/material";
import { useState } from "react";
import {
  FilterAltOutlined as FilterAltOutlinedIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

export default function Filter({
  containerRef,
}: {
  containerRef: React.RefObject<null>;
}) {
  const filterButtonStyle = {
    height: "32px",
    textTransform: "none",
    color: "black",
    backgroundColor: "white",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
  };

  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className="flex items-center justify-center bg-white lg:w-[175px] px-[20px] rounded-[12px] opacity-50"
        onClick={() => setFilterOpen(true)}
      >
        <div className="w-full flex flex-row items-center justify-between text-center text-[16px] text-black font-semibold opacity-50 cursor-not-allowed">
          <div className="flex-1 flex flex-row items-center gap-[6px]">
            <FilterAltOutlinedIcon sx={{ width: "18px", height: "18px" }} />
            Filter
          </div>
          <ArrowDropDownIcon />
        </div>
      </div>
      <Modal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        container={containerRef.current}
      >
        <Box
          className="lg:w-[1170px] absolute left-1/2 top-[140px] transform -translate-x-1/2 bg-white rounded-[12px] p-[16px] flex flex-col gap-[16px] outline-none"
          style={{ boxShadow: "0px 10px 20px 0px #00000026" }}
        >
          <div className="flex flex-row items-center gap-[40px]">
            <div>Sort:</div>
            <div className="flex flex-row items-center gap-[10px]">
              <Button variant="contained" sx={filterButtonStyle}>
                Top Mention
              </Button>
              <Button variant="contained" sx={filterButtonStyle}>
                XFeed
              </Button>
              <Button variant="contained" sx={filterButtonStyle}>
                Last Active
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[40px]">
            <div>Tag:</div>
            <div className="flex flex-row items-center gap-[10px]">
              <Button variant="contained" sx={filterButtonStyle}>
                DEV
              </Button>
              <Button variant="contained" sx={filterButtonStyle}>
                Builder
              </Button>
              <Button variant="contained" sx={filterButtonStyle}>
                KOL
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[40px]">
            <div>Import: </div>
            <div className="flex flex-row items-center gap-[10px]">
              <Button variant="contained" sx={filterButtonStyle}>
                PUMP.NOW
              </Button>
              <Button variant="contained" sx={filterButtonStyle}>
                X(Twitter)
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
