const storage = {
  save(key: string, value: any) {
    localStorage.setItem(
      key,
      value instanceof Object ? JSON.stringify(value) : value
    );
  },
  get<T extends null>(key: string) {
    return JSON.parse(localStorage.getItem(key)) as T;
  }
};

export default storage;
