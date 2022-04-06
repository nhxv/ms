import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

function Book({ book }) {
  let navigate = useNavigate();

  return (
    <Card className="mb-4">
      <div className="p-4">
        <div>
          <img src={book.image.imagePath} alt="book cover" width="180" height="280" className="d-block mx-auto mb-2" />
          <h6 className="mb-0 mt-2 text-center">{book.title}</h6>
          <p className="mt-0 mb-2 p-text-secondary text-center">by {book.author.name}</p>
        </div>
        <Button label="Read more" onClick={() => navigate(`${book.id}`)} style={{width: "100%"}}></Button>
      </div>
    </Card>
  )
}

export default Book;