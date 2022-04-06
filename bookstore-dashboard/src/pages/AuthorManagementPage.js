import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AuthorForm from '../components/AuthorForm';
import { useState } from 'react';
import AuthorList from '../components/AuthorList';

function AuthorManagementPage() {
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
  <section className="mt-5">
    <h5>All authors</h5>
    <Button label="Add new author" icon="pi pi-plus" className="p-button p-button-secondary" onClick={onOpenAuthorForm}></Button>
    <Dialog header="Author form" visible={displayAuthorForm} style={{ width: "50%" }} dismissableMask onHide={onHideAuthorForm}>
      <AuthorForm onHide={onHideAuthorForm} />
    </Dialog>
    <AuthorList />
  </section>)
}

export default AuthorManagementPage;