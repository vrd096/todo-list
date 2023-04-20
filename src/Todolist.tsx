export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}


export type PropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: Function;
}


export const Todolist  = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button></button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => <li>
                        <input type="checkbox" checked={t.isDone} />
                        <span>{t.title}</span>
                        <button onClick={() => {props.removeTask(t.id)}}>X</button>
                    </li>
                   )
                }
                
            </ul>
        </div>
    )
}