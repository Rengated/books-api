## Для компании "Ботхаб" 

## Описание

Это тестовое задание для Back-end Node.js-разработчика, которое представляет собой RESTful API для управления коллекцией книг. Включает в себя добавление, чтение, обновление, удаление книг и учетные записи пользователей, а также расширенные функции управления для администраторского доступа.

## Требования

- Node.js 
- Express.js 
- TypeScript 
- PostgreSQL 
- ORM PrismaORM 
- JWT для аутентификации и авторизации 
- Docker
 

## Структура проекта

- `Dockerfile`: файл для Docker, содержит все необходимые инструкции для Docker сборки и запуска проекта.
- `docker-compose.yml`: файл для Docker Compose, помогает автоматизировать процесс объединения и сборки Docker контейнеров.
- `package-lock.json` и `package.json`: содержат информацию о проекте и используемых зависимостях.
- `prisma/`: содержит конфигурационные файлы для Prisma ORM.
- `src/`: каталог с исходным кодом:
  - `controllers/`: содержит контроллеры для обработки HTTP-запросов к API.
  - `global.d.ts`: файл с объявлениями глобальных типов TypeScript.
  - `index.ts`: точка входа в приложение.
  - `middleware/`: содержит промежуточные обработчики (middleware).
  - `prisma/`: клиентская библиотека Prisma для взаимодействия с базой данных.
  - `repositories/`: содержит классы-репозитории, которые обслуживают операции с базой данных.
  - `services/`: содержит сервисы бизнес-логики, которые используются контроллерами для выполнения основных операций.
- `tsconfig.json`: файл настроек TypeScript.

## Для старта проекта 
    создаем .env
    docker compose up -d
    docker compose exec -it backend bash  
    npm run seed
