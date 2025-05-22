import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { IconButton } from "@mui/material";

export function Modal({ active, setActive, children }) {
  return (
    <div
      className={`fixed duration-500  h-screen w-screen bg-[black]/30 top-0 left-0 flex  pointer-events-none items-center justify-center z-10 ${
        active ? "opacity-100 pointer-events-auto" : "opacity-0"
      }`}
      onClick={() => setActive(false)}
    >
      <div
        className={`p-[10px] duration-300 rounded bg-[white] w-[320px] md:w-[450px] flex flex-col ${
          active ? "scale-100" : "scale-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton className="self-end" onClick={() => setActive(false)}>
          <CancelRoundedIcon />
        </IconButton>

        {children}
      </div>
    </div>
  );
}
