import Dialog from "@mui/material/Dialog";
import SearchBar from "./SearchBar";
import { Prettify } from "@/utils/Prettify";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const SimpleDialog = ({ onClose, selectedValue, open }: SimpleDialogProps) => (
  <Dialog
    onClose={() => {
      onClose(selectedValue);
    }}
    open={open}
    fullWidth
    PaperProps={{
      style: {
        borderRadius: "1rem",
        position: "absolute",
        top: "2rem",
      },
    }}
  >
    <SearchBar />
  </Dialog>
);

type PopupType = Prettify<SimpleDialogProps>;

export default function Popup({ open, onClose, selectedValue }: PopupType) {
  return (
    <div>
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={onClose}
      />
    </div>
  );
}
