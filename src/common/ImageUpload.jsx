import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
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

  return (
    <div className="App">
      <h2>Загрузить изображение:</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={uploadImage} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Загрузить"}
      </button>
    </div>
  );
}

export default ImageUpload;