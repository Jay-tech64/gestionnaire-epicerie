import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Article from "./Article";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CreateGrocery = (props) => {
    return (
        <div className="divStyles d-flex justify-content-center p-3">
            <main className="d-flex flex-column col-sm-10 p-4 bg-white rounded">
                <h1 className="text-center">Nouvelle épicerie</h1>
                <form onSubmit={props.onSubmit}>
                    <div className="d-flex my-4">
                        <input
                            type="text"
                            className="flex-grow-1 rounded"
                            placeholder="Ajouter un élément à votre épicerie"
                            value={props.item}
                            onChange={props.setItem}
                            ref={props.inputFocus}
                            autoFocus
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            className="rounded mx-1"
                            placeholder="Prix"
                            value={props.price}
                            onChange={props.setPrice}
                            required
                        />
                        <button className="btn btn-info mx-2">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </form>
                <section className="articleList">
                    {props.articles.map((article, i) => (
                        <Article
                            className="my-2"
                            key={i}
                            value={article.name}
                            price={article.price}
                            delete={props.onDelete}
                        />
                    ))}
                </section>
                <section className="d-flex align-items-bottom mt-auto">
                    <h1 className="m-0">Prix total :</h1>
                    <p className="fs-2 mx-2 my-0">{props.totalPrice} $</p>
                    <button
                        className="btn btn-success ms-auto"
                        onClick={props.showModal}
                    >
                        Terminer
                    </button>
                </section>
                <Modal show={props.show} onHide={props.closeModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Titre de l'épicerie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={props.onComplete}>
                            <Form.Group
                                className="mt-3 mb-5"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez le nom de l'épicerie"
                                    value={props.groceryName}
                                    onChange={props.setGroceryName}
                                    autoFocus
                                    required
                                />
                            </Form.Group>
                            <div className="d-flex flex-row-reverse">
                                <Button variant="primary" type="submit">
                                    Sauvegarder
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={props.closeModal}
                                    className="me-2"
                                >
                                    Annuler
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </main>
        </div>
    );
};

export default CreateGrocery;
