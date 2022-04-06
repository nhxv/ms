import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router";

function BookPublish({ book }) {
  let navigate = useNavigate();

  return (
  <>
  <Card>
    <div className="p-4">
      <img src={book.image.imagePath} alt="" height="210" width="135" className="d-block mx-auto" />
      <div className="text-center">
        <h6 className="p-text-link" onClick={() => navigate(`/books/${book.id}`)}>{book.title}</h6>
        <div>{book.genres.map((genre) => {
          return (<Tag key={genre.id} value={genre.name.toLowerCase()} rounded className="mr-2 mb-3 p-tag-fade-secondary"></Tag>)
        })}</div>
      </div>

    </div>
  </Card>
  </>
  )
}

export default BookPublish;