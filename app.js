const App = {
	data: () => ({
		title: 'Vue',
		myPlace: 'Введите любой текст',
		inputValue: '',
		todo: [],
		warning: false,
		isEven: false,
	}),
	methods: {
		addNewTodo(e) {
			e.preventDefault();
			if (this.inputValue.length <= 5) {
				this.myPlace = 'Значение должно быть не менее 5 символов';
				this.inputValue = '';
				e.target.firstChild.firstChild.style.borderColor = 'red';
				return;
			}
			const todoObj = { item: this.inputValue, completed: false };
			this.todo.push(todoObj);
			this.warning = false;

			const todos = getLocalStorage();
			todos.push(todoObj);
			localStorage.setItem('todos', JSON.stringify(todos));

			this.myPlace = 'Введите любой текст';
			this.inputValue = '';
			e.target.firstChild.firstChild.style.borderColor = '#ccc';
		},
		toCapitalize(value) {
			return (
				value.split('').shift().toUpperCase() +
				value.split('').slice(1).join('')
			);
		},
		deleteNote(index) {
			this.todo.splice(index, 1);
			localStorage.setItem('todos', JSON.stringify(this.todo));
		},
		completeNote(index) {
			this.todo[index].completed = true;
			localStorage.setItem('todos', JSON.stringify(this.todo));
		},
		notCompleteNote(index) {
			this.todo[index].completed = false;
			localStorage.setItem('todos', JSON.stringify(this.todo));
		},
		myFunctionOnLoad() {
			const todos = getLocalStorage();

			if (todos && todos.length) {
				todos.forEach(todo => {
					this.todo.push(todo);
				});
			}
		},
	},
	computed: {
		todoDoubleLength() {
			return this.todo.length * 2;
		},
	},
	watch: {
		inputValue(value) {
			if (value.length > 100) {
				this.warning = true;
				this.inputValue = '';
				return;
			}
		},
	},
	created() {
		this.myFunctionOnLoad();
	},
};

Vue.createApp(App).mount('#count');

function getLocalStorage() {
	return JSON.parse(localStorage.getItem('todos')) || [];
}
