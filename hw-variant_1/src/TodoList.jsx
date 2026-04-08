function TodoList({ todos, onDelete }) {
return (
<ul>
{todos.map((todo, index) => (
<li key={todo.id}> 
    {/* виновник торжества - как раз то самое "простое" сравнение старого и нового dom дерева в реакте. Он сравнивает по типу (section => div например) и key. А то что поменялся текст его вообще не волнует, он просто отрисует новый текст, но ноду будет считать старой. Поэтому рисовались старые статуссы Done, как в изначальном порядке тудушек в массиве из useState */}
<input type="checkbox" defaultChecked={todo.done} />
<span>{todo.text}</span>
<button onClick={() => onDelete(index)}>
Удалить
</button>
</li>
))}
</ul>
);
}

export default TodoList