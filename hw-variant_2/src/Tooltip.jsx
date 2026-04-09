// 2.1

import { useLayoutEffect, useRef, useState } from 'react'

function Tooltip({ text, targetRef }) {
    const tooltipRef = useRef(null);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    // Это вызывает мигание — почему?
    // Потому что используется useEffect вместо useLayoutEffect. Оба хука исполняются в commit phase. А уже в ней есть фаза paint. И вот как раз это и есть та самая "отрисовка интерфейса". useEffect выполняется ПОСЛЕ paint, потому и моргает. А useLayoutEffect с нами бы так не поступил, т.к. он выполняется ДО фазы paint. 
    useLayoutEffect(() => {
        if (!tooltipRef.current || !targetRef.current) return;
        const rect = targetRef.current.getBoundingClientRect();
        const h = tooltipRef.current.offsetHeight;
        setPos({ top: rect.top - h - 8, left: rect.left });
    }, [text]);
    return (
        <div ref={tooltipRef} style={{ position: 'fixed', ...pos }}>
        {text}
        </div>
    );
}

export default Tooltip