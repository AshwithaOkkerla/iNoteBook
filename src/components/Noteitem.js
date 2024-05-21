import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} AND Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quaerat deleniti, non reprehenderit minus sit
            possimus libero cum repellendus neque error quia, expedita est
            inventore. Sed inventore libero soluta voluptatem iure?
            Exercitationem iure autem reiciendis quas!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
