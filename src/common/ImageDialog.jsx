
import React, { useState } from "react";
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import AddFile from '../assets/img/gallery.png'

const ImageDialog = ({dialogVisible, setDialogVisible}) => {

  const [file, setFile] = useState(null); // Состояние для выбранного файла
  const [imageUrl, setImageUrl] = useState(""); // Состояние для ссылки на изображение
  const [isLoading, setIsLoading] = useState(false); // Состояние для индикации загрузки

  // Обработчик загрузки файла
  const handleChange = (e) => {
    setFile(e.target.files[0]); // Сохраняем файл в состоянии
  };

  // Функция для отправки изображения на ImgBB
  const uploadImage = () => {
    if (!file) {
      alert("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", file); // Добавляем файл в formData

    const apiKey = "8d79781c54e19eb95c3563d7f55ffc83";
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    // Отправка POST-запроса на ImgBB
    axios
      .post(imgbbUrl, formData)
      .then((response) => {
        const uploadedImageUrl = response.data.data.url; // Получение ссылки на загруженное изображение
        setImageUrl(uploadedImageUrl); // Сохранение ссылки в состоянии
      })
      .catch((error) => {
        console.error("Ошибка загрузки изображения:", error);
        alert("Ошибка загрузки изображения");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

    const footerContent = (
        <div>
          <button onClick={uploadImage} className="rounded-md w-40 py-3 text-white bg-orange-600" disabled={isLoading}>
            {isLoading ? "Загрузка..." : "Загрузить"}
          </button>
        </div>
    );

    return (
      <Dialog header="Загрузить изображение:" visible={dialogVisible} position={'bottom'} className="w-full flex flex-col" onHide={() => {if (!dialogVisible) return; setDialogVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
        <label htmlFor='file' className="cursor-pointer">
        <img className="w-10 h-10" src={AddFile} alt="Выбрать файл" />
        {
          file ? (
            <div>
              <img src={URL.createObjectURL(file)} alt="new" />
            </div>
          ) : null
        }
      </label>
      <input
        id="file"
        type="file"
        onChange={handleChange}
        multiple
        className="hidden"
      />
        {imageUrl && <span>Ссылка на изображение: {imageUrl}</span>}
      </Dialog>
    )
}
        
export default ImageDialog;