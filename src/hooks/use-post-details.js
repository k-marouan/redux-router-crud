import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../store/postSlice";
import { useParams } from "react-router-dom";

const usePostDetails = () => {
    const { id } = useParams();
    console.log(id); // 1 (http://localhost:3000/post/1)

    const dispatch = useDispatch();
    const { loading, error, record } = useSelector(state => state.posts);
  
    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    return { loading, error, record }
}

export default usePostDetails