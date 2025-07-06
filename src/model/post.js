export default class Post {
  constructor(title, image) {
    this.title = title;
    this.date = new Date();
    this.image = image;
  }

  toString() {
    return JSON.stringify(
      {
        date: this.date.toJSON(),
        image: this.image,
        title: this.title
      },
      null,
      2
    );
  }
}
