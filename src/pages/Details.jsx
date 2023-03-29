
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import { cleanRecord } from "../store/postSlice";

const Details = () => {
  const dispatch = useDispatch();
  const { loading, error, record } = usePostDetails();

  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    }
  }, [dispatch]);
  
  return (
    <div>
      <Loading loading={ loading } error={ error }>
        <p>Title: { record?.title }</p>
        <p>Description: { record?.description }</p>
      </Loading>
    </div>
  )
}

export default Details