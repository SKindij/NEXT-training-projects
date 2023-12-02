// @path: @/backend/utils/apiFilters.ts
// призначений для обробки та фільтрації запитів до API
class APIFilters {
  query:any; // зберігає фільтрований запит
  queryStr:any; // зберігає рядок запиту
  // приймає запит до БД та рядок запиту для фільтрації
  constructor(query:any, queryStr:any) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // метод для пошуку за рядком запиту "location"
  search():APIFilters {
    // перевіряємо, чи переданий параметр 'location' у рядку запиту
    const location = this.queryStr?.location
      // якщо так, то буде створено об'єкт для пошуку за адресою
      ? { address: {
            $regex: this.queryStr.location, // вираз для пошуку
            $options: "i", // опція для регістронезалежного пошуку
          },
        // якщо ні, то об'єкт для пошуку буде пустим
      } : {};
    // оновлюємо початковий запит, застосовуючи об'єкт 'location'
    this.query = this.query.find({ ...location });
    // посилання на сам клас для подальшого використання
    return this;
  }
  // метод для фільтрації загального запиту
  filter():APIFilters {
    // створюємо копію рядка запиту
    const queryCopy = { ...this.queryStr };
    // поля, які не потрібно використовувати для фільтрації
    const removeFields = ["location", "page"];
    // видаляємо непотрібні поля з копії рядка запиту
    removeFields.forEach( (el) => delete queryCopy[el] );
    // оновлюємо початковий запит відфільтрованим рядком
    this.query = this.query.find(queryCopy);
    // посилання на сам клас для подальшого використання
    return this;
  }
   // метод для реалізації пагінації результатів
  pagination(resPerPage:number):APIFilters {
    // визначаємо номер поточної сторінки
    const currentPage = Number(this.queryStr?.page) || 1;
    // визначаємо кількість записів, які потрібно пропустити для пагінації
    const skip = resPerPage * (currentPage - 1);
    // оновлюємо початковий запит, застосовуючи обмеження та пропуск
    this.query = this.query.limit(resPerPage).skip(skip);
    // посилання на сам клас для подальшого використання
    return this;
  }
}
  
export default APIFilters;
