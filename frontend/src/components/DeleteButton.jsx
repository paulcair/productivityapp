function DeleteButton({ onClick }) {
  return (
    <div className="flex-start ml-2">
        <button className="delete-button" onClick={onClick}>
        <div className="circle"></div>
        <span className="delete-icon">×</span>
        <div className="tooltip">
            <span>Delete</span>
        </div>
        </button>
    </div>
  );
}

export default DeleteButton;
