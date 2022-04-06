import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addAuthor } from '../redux/actions/authorActions';
import { editAuthor } from '../redux/actions/authorActions';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';

function AuthorForm ({ onHide, authorEdit }) {
  const [imageFile, setImageFile] = useState(null);
  const [birthday, setBirthday] = useState(new Date(authorEdit?.dob));
  const [chooseButton, setChooseButton] = useState({
    label: (authorEdit ? "Choose different image" : "Choose image"),
    icon: "pi pi-upload",
  });
  const dispatch = useDispatch();

  const authorForm = useFormik({
    initialValues: {
      name: (authorEdit ? authorEdit.name : ""),
      hometown: (authorEdit? authorEdit.hometown : ""),
    },
    onSubmit: (basicData) => {
      let authorFormData = new FormData();
      authorFormData.append('imageFile', imageFile);
      authorFormData.append('author', JSON.stringify({
        name: basicData.name, 
        hometown: basicData.hometown, 
        dob: birthday,
      }));

      if (authorEdit) {
        dispatch(editAuthor(authorFormData, authorEdit.id))
        .then(() => {
          onHide();
          setImageFile(null);
          setBirthday(null);
          authorForm.resetForm();  
        })
        .catch(e => {
          // TODO: display error UI
          const error = JSON.parse(JSON.stringify(e));
          console.log(error.message);
        })

      } else {
        dispatch(addAuthor(authorFormData))
        .then(() => {
          onHide();
          setImageFile(null);
          setBirthday(null);
          authorForm.resetForm();  
        })
        .catch(e => {
          // TODO: display error UI
          const error = JSON.parse(JSON.stringify(e));
          console.log(error.message);
        });
      }

    }
  });

  const onUploadAvatar = (e) => {
    if (imageFile) {
      e.options.clear();
      setImageFile(null);
      setChooseButton({
        label: "Choose image",
        icon: "pi pi-upload",
      })
    } else {
      setImageFile(e.files[0]);
      setChooseButton({
        label: "Cancel upload",
        icon: "pi pi-times",
      });
    }
  }

  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  const yearNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="ml-2" style={{ lineHeight: 1 }} />;
  }

  return (
  <>
    <div className="mb-4">
      <div className="py-3 px-4 row justify-content-center">
        <div className="col-lg-8 col-12">
          <form onSubmit={authorForm.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="d-block">Full name:</label>
              <InputText id="name" name="name" className="d-block" 
              value={authorForm.values.name} onChange={authorForm.handleChange}  
              style={{width: '100%'}} autoFocus></InputText>  
            </div>

            <div className="mb-4">
              <label htmlFor="hometown" className="d-block">Hometown:</label>
              <InputText id="hometown" name="hometown" className="d-block" 
              value={authorForm.values.hometown} onChange={authorForm.handleChange}  
              style={{width: '100%'}}></InputText>  
            </div>

            <div className="mb-4">
              <label htmlFor="dob" className="d-block">Date of birth:</label>
              <Calendar id="dob" value={birthday} 
              onChange={(e) => setBirthday(e.value)} monthNavigator yearNavigator yearRange="1950:2020"
              monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} 
              style={{width: '100%'}}/>
            </div>

            <div className="mb-4">
              <FileUpload mode="basic" name="avatar" accept="image/*" auto={true}
              chooseOptions={chooseButton} customUpload={true}  uploadHandler={onUploadAvatar} />
              <small className="p-text-secondary">Original image size should be 225x350</small>
              {imageFile ? (
              <div className="mt-4">
                <img src={imageFile.objectURL} alt="uploaded" 
                className="d-block" width="112.5" height="170" />
                <p className="mt-2">
                  <span>{imageFile.name}</span>
                </p>
              </div>
              ) : <></>}
              { (authorEdit && !imageFile) ? (
                <div className="mt-4">
                  <img src={authorEdit.image.imagePath} alt="current"
                  className="d-block" width="112.5" height="170" />
                  <p className="mt-2">
                    <span>{authorEdit.image.name}</span>
                  </p>
                </div>
              ): <></>}
            </div>

            <Button label="Submit" type="submit" className="mt-2" style={{width: '100%'}}></Button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default AuthorForm;