[Ссылка на видео с демонстрацией проекта](https://www.youtube.com/watch?v=twVhf26uobE&ab_channel=%D0%98%D0%B2%D0%B0%D0%BD%D0%93%D0%BD%D0%B5%D0%B4%D1%8C%D0%BA%D0%BE)

Реализовал весь необходимый функционал изложенный в ТЗ и немного добавил дополнительного функционала от себя.

## Стек технологий

- Next.js 14 с App router
- React
- TypeScript
- Tailwind CSS
- Clerk (для аутентификации и авторизации)
- Prisma
- PostgreSQL (развёртывание с использованием Docker)
- Shadcn UI
- Toaster (для уведомлений)
- React Query
- Tanstack Table
- React Ace (редактор кода)

В приложение есть несколько страниц: главная, страница уроков(задач), старница одной задачи, авторизация/реигстрация, реализованы приватные роуты, и так же авторизованный пользователь не может попасть на главную, страницы авторизации/регистрации, после выхода из аккаунта пользователь перебрасывается на главную

Для организации струтруы страниц использовал Route Groups для создания гибких layout для каждой группы роутов

Использовал Prisma и Potsgresql, описал 2 модели Lesson(сама задача) и Submission(отправленное решение, для каждого пользователя уникально), есть несколько миграций

Использовал react query, так как на мой взгляд он здесь будет более удобным и выгодным, нежели redux

После авторизации пользователь попадает на страницу /lessons, данные получаются при помощи RSC(React Server Components) по /api/lessons, и выводятся в виде таблицы в возможностью пагинации при помощи Tanstack table, при клине на любое из полей таблицы пользователь переходит на /lessons/{lessonId} данные получаются при помощью React query с /api/lessons/{lessonsId}, данные приходят с 2-х секундной задержкой, пока данных нет, пользователь видит анимированный spinner, при отправки данных(react query mutation), в ответ пользователь получает toaster уведомление с результатом true/false, также данные о количестве попыток автоматически обновляются без перезагрузки страницы
