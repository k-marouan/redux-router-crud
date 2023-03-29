import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const PostListItem = ({ data, deleteRecord, isLoggedIn }) => {
    const navigate = useNavigate();

    const deleteHandler = (item) => {
        if(window.confirm("Delete?")) {
            deleteRecord(item.id);
        }
    }
    const records = data.map((elt, idx) => {
        return (
          <tr key={ elt.id }>
            <td>#{ ++idx }</td>
            <td><Link to={`post/${elt.id}`}>{ elt.title }</Link></td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success" onClick={() => navigate(`post/${elt.id}/edit`)}>Edit</Button>
                <Button variant="danger" onClick={ () => deleteHandler(elt)} disabled={ !isLoggedIn }>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        );
      });
    return (
    <>
        { records }
    </>
  )
}

export default PostListItem