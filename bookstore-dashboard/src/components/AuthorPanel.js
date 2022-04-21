import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router';
import { Dialog } from 'primereact/dialog';
import AuthorForm from '../components/AuthorForm';
import { useState } from 'react';

function AuthorPanel({ author }) {
  const navigate = useNavigate();
  const [displayAuthorForm, setDisplayAuthorForm] = useState(false);

  const dialogFuncMap = {
    "displayAuthorForm": setDisplayAuthorForm,
  };

  const onOpenAuthorForm = () => {
    dialogFuncMap["displayAuthorForm"](true);
  }

  const onHideAuthorForm = () => {
    dialogFuncMap["displayAuthorForm"](false);
  }

  return (
  <>
    <Card>
      <div className="p-4">
        <div className="d-flex flex-column">
          <div>
            {/* original size: 225 x 350 -> 9 x 14 */}
            <img src={author?.image?.imagePath} alt="" width="180" height="280" className="d-block mx-auto" />
          </div>

          <div className="text-center">
            <h6>{author.name}</h6>
          </div>
          <Button label="Read more" onClick={() => navigate(`${author.id}`)}></Button>
          <Button label="Edit author info" className="mt-3 p-button-fade p-button-secondary" onClick={onOpenAuthorForm}></Button>
          <Dialog header="Author form" visible={displayAuthorForm} style={{ width: "50%" }} onHide={onHideAuthorForm} dismissableMask>
            <AuthorForm onHide={onHideAuthorForm} authorEdit={author} />
          </Dialog>
        </div>
      </div>
    </Card>
  </>
  )
}

export default AuthorPanel;