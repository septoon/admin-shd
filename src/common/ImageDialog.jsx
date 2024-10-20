
import React, { useState } from "react";
import axios from "axios";
import { Dialog } from 'primereact/dialog';

const ImageDialog = ({dialogVisible, setDialogVisible, onUpload}) => {

  const [file, setFile] = useState(null); // Состояние для выбранного файла
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
        onUpload(uploadedImageUrl); // Сохранение ссылки в состоянии
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
      <Dialog header="Загрузить изображение:" visible={dialogVisible} contentClassName="pt-3" position={'bottom'} className="w-full flex flex-col" onHide={() => {if (!dialogVisible) return; setDialogVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
        <label htmlFor='file' className="cursor-pointer">
          <span className="rounded-md w-40 py-3 px-2 text-white bg-orange">Выбрать фото</span>
        </label>
        {
          file ? (
            <div>
              <img className="w-1/2 my-5 rounded-md" src={URL.createObjectURL(file)} alt="new" />
            </div>
          ) : null
        }
      <input
        id="file"
        type="file"
        onChange={handleChange}
        multiple
        className="hidden"
      />
        {/* {imageUrl && <span>Ссылка на изображение: {imageUrl}</span>} */}
      </Dialog>
    )
}
        
export default ImageDialog;