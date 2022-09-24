const CreateGrocery = () => {
    return (
        <div className="divStyles d-flex justify-content-center p-3">
            <main className="col-sm-10 p-4 bg-white text-center rounded">
                <h1>Page de la création d'une nouvelle épicerie</h1>
                <form>
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ajouter un élément à votre épicerie"
                        />
                        <button className="btn btn-info mx-2">Add</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateGrocery;
