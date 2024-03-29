import { useState } from "react";
import { Footer } from "../../../Footer";
import { Header } from "../../../Header";
import { Main } from "../../../Main";

export function CampaignCreate() {
    const [formAlert, setFormAlert] = useState(false)
    const [newForm,setNewForm]=useState({})
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        message: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newObject = {
            name: formData.name,
            description: formData.description,
            type: formData.type,
            message: formData.message,
        };


        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/campaign/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObject),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }

            setNewForm({})
            const data = await response.json();
            setNewForm(data)
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.toggle("good-message")
            formMessages.innerText = newForm.message;
            setFormAlert(true)
            
        } catch (error) {
            const formMessage = document.getElementById('form-messages');
            formMessage.classList.add("error-message");
            formMessage.innerText = error;
        }
    };

    return (
        <>
            <Header />
            <Main title={'Campagne'}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend> Création d'une campagne </legend>
                        <div aria-live="polite" id="form-messages" className=""></div>
                        <label className="formInput-card">
                            Nom de la campagne :
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Description :
                            <input type="text" name="description" value={formData.description} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Type :
                            <select name="type" value={formData.type} onChange={handleChange} className="formInput-item" >
                                <option>Choisir le type</option>
                                <option value={"Email"}>Email</option>
                                <option value={"Phoning"}>Phoning</option>
                            </select>
                        </label>
                
                        <label className="formInput-card">
                            Message :
                            <input type="text" name="message" value={formData.message} onChange={handleChange} className="formInput-item" />
                        </label>

                        <button type="submit" className="formSearch-item-button">Créer la campagne</button>

                    </fieldset>
                </form>
            </Main>
            <Footer />
        </>
    )
}

// manque le style 