import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BookPublish from './BookPublish';
import backend from '../redux/api';

function AuthorDetail() {
  const [author, setAuthor] = useState(null);
  const { authorId } = useParams();

  useEffect(() => {
    backend.get(`/authors/${authorId}`).then((res) => {
      let authorData = res.data;
      let formattedDate = new Date(authorData.dob);
      authorData.dob = formattedDate.toLocaleDateString("en-US");
      setAuthor({
        image: authorData.image, 
        name: authorData.name, 
        hometown: authorData.hometown, 
        dob: authorData.dob,
        books: authorData.books,
      });
    });
  }, [authorId]);

  if (!author) {
    return (<></>)
  } else {
    return(
      <>
        <section>
          <div className="row mt-5">
            <div className="col-lg-4 col-12">
              <h5>Author bio</h5>
              <img src={author.image.imagePath} alt="" width="180" height="280" className="d-block" />
              <p className="p-text-secondary mt-4 mb-0">Full name:</p>
              <p className="m-0">{author.name}</p>
              <p className="p-text-secondary mt-3 mb-0">Hometown:</p>
              <p className="m-0">{author.hometown}</p>
              <p className="p-text-secondary mt-3 mb-0">Birthday:</p>
              <p className="m-0">{author.dob}</p>
            </div>
    
            <div className="col-lg-8 col-12">
              <h5>Published manga</h5>
              <div className="row">
                {author.books.length > 0 ? author.books.map((book) => {
                  return (
                    <div key={book.id}  className="col-lg-4 col-sm-4 mb-4">
                      <BookPublish book={book} />
                    </div>
                  )
                }) : (<><div>Nothing to show</div></>)}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default AuthorDetail;