import pen from "../assets/pen.svg";

const Edit = ({ onClick }) => {
    return (
        <img
            className="edit-pen-image"
            src={pen}
            alt=""
            onClick={onClick}
        />
    );
};

export default Edit;