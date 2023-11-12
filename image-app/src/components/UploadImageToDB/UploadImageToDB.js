import { Fragment, useEffect, useRef, useState } from "react";

const UploadImageToDB = () => {
    const [image, setImage] = useState();
    const imageRef = useRef();
    
    const fileSelecteHandler = event => {
        setImage(event.target.files[0]);
    }

    const getImage = () => {
        fetch(`http://127.0.0.1:8000/api/getImage/${imageRef.current.value}`, {
            method: "GET"
        })
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            console.log(url);
            setImage(url);
        });
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("image", image ? image : null);


        fetch("http://127.0.0.1:8000/api/storeImage", {
            method: "POST",
            body: formData,
        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log(data);
        })
    }

    return (
        <Fragment>
            <div>
                <input type="file" name="image" onChange={fileSelecteHandler} />
                <br/>
                <button onClick={handleSubmit}>Send</button>
            </div>
            <br />
            <div>
                <input ref={imageRef} type="text" name="image" />
                <br/>
                <button onClick={getImage}>getImage</button>
            </div>
            <img src={image} width={500} />
        </Fragment>
    )
}

export default UploadImageToDB;