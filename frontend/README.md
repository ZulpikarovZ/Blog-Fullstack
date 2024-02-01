Области хранения данных:

-   DB на json-server
-   BFF
-   Redux store

Сущности приложения:

-   пользователь: БД(список пользователей), BFF(сессия текущего), редакс стор(отображение в браузере)
-   роль пользователя: БД(список ролей), BFF(сессия пользователя с ролью), стор(использование на клиенте)
-   статья: БД(список статей), стор(отображение в браузере)
-   комментарии: БД(список комментариев), стор(отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / role_id /registered_at
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BFF:

-   сессия текущего пользователя: login / password/ role

Схема для Redux Store:

-   user: id / login / roleId
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registeredAt / role
