class APIFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort'];
    excludedFields.forEach((el) => delete queryObj[el]);
    this.query = this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort === '어려움') {
      this.query = this.query.sort({ difficulty_level: -1 });
      return this;
    }

    this.query = this.query.sort({ difficulty_level: 1 });
    return this;
  }
}

module.exports = APIFeatures;
