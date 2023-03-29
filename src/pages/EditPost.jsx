import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePost, cleanRecord } from "../store/postSlice";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details"
import { useNavigate } from "react-router-dom";
import WithGuard from "../util/WithGuard";

import { useFormik } from 'formik';
import { postSchema } from '../util/ValidationSchema';


const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, record } = usePostDetails();

  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    }
  }, [dispatch]);
  
  // Formik
  const formik = useFormik({
    initialValues: {
      title: record ? record?.title : "",
      description: record ? record.description : "",
    },
    enableReinitialize: true,
    validationSchema: postSchema,
    onSubmit: values => {
      dispatch(updatePost({ 
        id: record.id, 
        title: values.title, 
        description: values.description,
      }))
      .unwrap()
      .then(() => navigate("/"));
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
    <Loading loading={ loading } error={ error }>
      <Button variant="primary" type="submit">Submit</Button>
      </Loading>
  </Form>
    
  )
}

export default WithGuard(EditPost);