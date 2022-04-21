import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { Dialog } from 'primereact/dialog';
import BookForm from "./BookForm";
import { useState } from "react";

function BookPanel({ book }) {
  let navigate = useNavigate();
  const [displayBookForm, setDisplayBookForm] = useState(false);

  const dialogFuncMap = {
    "displayBookForm": setDisplayBookForm,
  };

  const onOpenBookForm = () => {
    dialogFuncMap["displayBookForm"](true);
  }

  const onHideBookForm = () => {
    dialogFuncMap["displayBookForm"](false);
  }

  return (
  <>
    <Card>
      <div className="p-4">
        <div className="d-flex flex-column">
          <div>
            {/* original size: 225 x 350 -> 9 x 14 */}
            <img src={book.image?.imagePath} alt="" width="180" height="280" className="d-block mx-auto" />
          </div>

          <div className="text-center">
            <h6>{book.title}</h6>
          </div>
          <Button label="Read more" className="p-button" onClick={() => navigate(`${book.id}`)}></Button>
          <Button label="Edit book info" className="mt-3 p-button-fade p-button-secondary" onClick={onOpenBookForm}></Button>
          <Dialog header="Book form" visible={displayBookForm} style={{ width: "50%" }} onHide={onHideBookForm} dismissableMask>
            <BookForm onHide={onHideBookForm} bookEdit={book} />
          </Dialog>
        </div>
      </div>
    </Card>
  </>
  )
}

export default BookPanel;