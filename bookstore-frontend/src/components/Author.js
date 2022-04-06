import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function Author({ author }) {
  let navigate = useNavigate();
  return (
  <>
    <Card className="mb-4">
      <div className="p-4">
       <div>
          <img src={author.image.imagePath} alt="author cover" width="180" height="280" className="d-block mx-auto mb-2" />
          <h6 className="mt-0 mb-2 text-center">{author.name}</h6>
          <Button label="Read more" onClick={() => navigate(`${author.id}`)} style={{width: "100%"}}></Button>
        </div>
      </div>
    </Card>
  </>
  )
}

export default Author;