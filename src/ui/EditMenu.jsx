import PropTypes from "prop-types";
import Button from "../ui/Button";
import { HashLoader } from "react-spinners";

function EditMenu({ data, handleDelete, handleEdit, handleShow, isDeleting }) {
  return (
    <div className="flex gap-2 my-3">
      {handleShow && <Button onClick={() => handleShow(data)}>Show</Button>}
      {handleEdit && <Button onClick={() => handleEdit(data)}>Edit</Button>}
      {handleDelete && (
        <Button
          onClick={() => handleDelete(data.id)}
          icon={<HashLoader size={25} loading={isDeleting} />}
        >
          Delete
        </Button>
      )}
    </div>
  );
}

EditMenu.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleShow: PropTypes.func,
  isDeleting: PropTypes.bool,
};

export default EditMenu;
