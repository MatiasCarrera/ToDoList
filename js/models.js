

export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem("todos"));
    if (!this.todos || this.todos.length < 1) {
      this.todos = [
        {
          id: 0,
          title: "Learn JS",
          description: "Watch JS tutorials",
          completed: false,
        },
      ];
      this.currentId = 1;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  findToDo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }
  toggleCompleted(id) {
    const index = this.findToDo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save()
  }

  editToDo(id, values){
    const index = this.findToDo(id)
    Object.assign(this.todos[index], values)
    this.save()
  }

  getToDos() {
    return this.todos;
  }

  addToDo(title, description) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false,
    };

    this.todos.push(todo);
    console.log(this.todos);

    this.save();
    return { ...todo };
  }

  removeToDo(id) {
    const index = this.findToDo(id);
    this.todos.splice(index, 1);
    this.save()
  }
}
