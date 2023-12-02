// @path: @/backend/utils/apiFilters.ts
// призначений для обробки та фільтрації запитів до API
class APIFilters {
  query:any; // зберігає фільтрований запит
  queryStr:any; // зберігає рядок запиту
  // приймає запит та рядок запиту для фільтрації
  constructor(query:any, queryStr:any) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // метод для пошуку за рядком запиту "location"
  search():APIFilters {
    const location = this.queryStr?.location
      ? { address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
        : {};
  
    this.query = this.query.find({ ...location });
    return this;
  }
  // метод для фільтрації загального запиту
  filter(): APIFilters {
    const queryCopy = { ...this.queryStr };
  
    const removeFields = ["location", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
  
    this.query = this.query.find(queryCopy);
  
    return this;
  }
   // метод для реалізації пагінації результатів
  pagination(resPerPage: number): APIFilters {
    const currentPage = Number(this.queryStr?.page) || 1;
    const skip = resPerPage * (currentPage - 1);
  
    this.query = this.query.limit(resPerPage).skip(skip);
  
    return this;
  }
}
  
export default APIFilters;
