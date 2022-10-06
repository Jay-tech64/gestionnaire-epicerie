import Article from "./Article";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const GroceryList = ({
    onSubmit,
    groceryName,
    setGroceryName,
    item,
    setItem,
    inputFocus,
    price,
    setPrice,
    articles,
    onDelete,
    totalPrice,
    onComplete,
    show,
    showModal,
    closeModal,
    errorMessage,
}) => {
    return (
        <main className="divStyles d-flex justify-content-center p-3">
            <div className="d-flex flex-column col-sm-10 p-4 bg-white rounded">
                <h1 className="text-center">
                    {typeof groceryName === "undefined"
                        ? "Nouvelle épicerie"
                        : groceryName}
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="d-flex my-4">
                        <input
                            type="text"
                            className="flex-grow-1 rounded"
                            placeholder="Ajouter un élément à votre épicerie"
                            value={item}
                            onChange={setItem}
                            ref={inputFocus}
                            autoFocus
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            className="rounded mx-1"
                            placeholder="Prix"
                            value={price}
                            onChange={setPrice}
                            required
                        />
                        <button className="btn btn-info mx-2">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </form>
                <section>
                    {articles.map((article, i) => (
                        <Article
                            className="my-2"
                            key={i}
                            value={article.name}
                            price={article.price}
                            deleteArticle={onDelete}
                        />
                    ))}
                </section>
                <section className="d-flex align-items-center mt-auto">
                    <h1 className="m-0">Prix total :</h1>
                    <p className="fs-2 mx-2 my-0">{totalPrice} $</p>
                    {errorMessage && (
                        <p className="errorMessage">{errorMessage}</p>
                    )}
                    <button
                        className="btn btn-success ms-auto"
                        onClick={showModal}
                    >
                        Terminer
                    </button>
                </section>
            </div>
            <Modal show={show} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Titre de l'épicerie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) =>
                            onComplete(e, groceryName, articles, totalPrice)
                        }
                    >
                        <Form.Group
                            className="mt-3 mb-5"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Entrez le nom de l'épicerie"
                                value={groceryName}
                                onChange={setGroceryName}
                                autoFocus
                                autoComplete="off"
                                required
                            />
                        </Form.Group>
                        <div className="d-flex flex-row-reverse">
                            <Button variant="primary" type="submit">
                                Sauvegarder
                            </Button>
                            <Button
                                variant="danger"
                                onClick={closeModal}
                                className="me-2"
                            >
                                Annuler
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </main>
    );
};

export default GroceryList;
