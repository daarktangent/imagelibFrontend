import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';



function UpdateModalComponent()
{
const [isShow,invokeModal] = useState(false);

const initModal= ()=>
{
    return invokeModal(!isShow);
}

return (  
<>
<button varient="success" onClick={initModal}>
    Edit
</button>
<Modal show ={isShow}>
    <Modal.Header closeButton onClick={initModal}>
        <Modal.Title>
            Update Post
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        This is the react bootStrap modal;
    </Modal.Body>
    <Modal.Footer>
        <Button varient = "danger" onClick={initModal}>
            close
        </Button>
        <Button varient = "dark" onClick={initModal}>
            Update
        </Button>
    </Modal.Footer>
</Modal>


</>);


}

export default UpdateModalComponent;