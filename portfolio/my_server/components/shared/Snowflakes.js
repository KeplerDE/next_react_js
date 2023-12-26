import React, { useEffect } from 'react';

const createSnowflake = (container) => {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.innerText = '❄';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
  snowflake.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(snowflake);

  // Удаление снежинки после того, как она исчезнет из поля зрения
  setTimeout(() => {
    snowflake.remove();
  }, 5000);
};

const Snowflakes = () => {
  useEffect(() => {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.id = 'snowflakes-container';
    document.body.appendChild(snowflakesContainer);

    // Создание начального набора снежинок
    for (let i = 0; i < 50; i++) {
      createSnowflake(snowflakesContainer);
    }

    // Регулярное добавление новых снежинок
    const interval = setInterval(() => {
      createSnowflake(snowflakesContainer);
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.removeChild(snowflakesContainer);
    };
  }, []);

  return null;
};

export default Snowflakes;
