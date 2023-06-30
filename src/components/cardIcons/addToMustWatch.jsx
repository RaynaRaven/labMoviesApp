import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToMustWatchIcon = () => {
  
    const onUserSelect = (e) => {
      e.preventDefault();
      // TODO -  implement add to must watch list func
    };
    return (
      <IconButton aria-label="add to must watch list" onClick={onUserSelect}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    );
  };
  
  export default AddToMustWatchIcon;