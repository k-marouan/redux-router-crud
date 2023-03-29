import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { insertPost } from '../store/postSlice';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { postSchema } from '../util/ValidationSchema';

import Loading from '../components/Loading';
import WithGuard from "../util/WithGuard";

const AddPost = (props) => {
console.log("props from WithGuard : ", props);
console.log("title from WithGuard : ", props.title);
console.log("message from WithGuard : ", props.message);
  const { loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Formik
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: postSchema,
    onSubmit: values => {
      const id = Math.floor(Math.random() * 500);
      dispatch(insertPost({ id, title: values.title, description: values.description }))
      .unwrap()
      .then(() => {
        navigate("/");
      }).catch(error => {
        console.log(error);
      });
      },
  });

  return (
    <Form onSubmit={ formik.handleSubmit }>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title} 
          isInvalid={ !!formik.errors.title } // !! => casting to boolean
        />
        <Form.Control.Feedback type="invalid">
          { formik.errors.title }
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description} 
          isInvalid={ !!formik.errors.description } // !! => casting to boolean
        />
        <Form.Control.Feedback type="invalid">
          { formik.errors.description }
        </Form.Control.Feedback>
      </Form.Group>
      <Loading loading={ loading } error={ error } >
        <Button variant="primary" type="submit" disabled={ loading }>Submit</Button>
      </Loading>
    </Form>
  )
}

export default WithGuard(AddPost);