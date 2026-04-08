import { useState } from 'react'

let externalCounter = 0;
function ClickTracker() {
    const [count, setCount] = useState(0);
    // Побочный эффект в render
    externalCounter++;
    console.log('renders:', externalCounter);
    // Это происходит из-за StrictMode. Он по дефолту рендерит дважды компоненты, чтобы можно было проще отловить баги. Это происходит только в dev режиме, на проде этого не будет. Убрать это можно просто если закоментить стрикт обертку в main.jsx
    return (
    <div>
    <p>Кликов: {count}</p>
    <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
    );
}

export default ClickTracker