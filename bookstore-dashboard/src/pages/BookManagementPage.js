import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { useState } from 'react';

function BookManagementPage() {
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
    <section className="mt-5">
      <h5>Book Management</h5>
      <Button label="Add book" icon="pi pi-plus" className="p-button p-button-secondary" onClick={onOpenBookForm}></Button>
      <Dialog header="Book form" visible={displayBookForm} style={{ width: "50%" }} onHide={onHideBookForm}>
        <BookForm onHide={onHideBookForm} />
      </Dialog>
      <BookList />
    </section> 
  )
}

export default BookManagementPage;