import { useState, useTransition } from 'react'

function ProductSearch({ products }) {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState(products);
    const [isPending, startTransition] = useTransition(); // Сигнал включить "режим фоновой загрузки"

    const handleChange = (e) => {
        const q = e.target.value;
        setQuery(q);
        // Зависает UI при каждом нажатии:
        startTransition(() => { //Благодаря этой обертке список может запаздывать с обновлением и грузиться "в фоне"
            setFiltered(
                products.filter(p =>
                    p.name.toLowerCase().includes(q.toLowerCase())
                    )
                );
        })
        
    };
    return (
        <>
            <input value={query} onChange={handleChange} placeholder="Поиск..." />
            {isPending? <Preloader /> : <ProductList items={filtered} /> {/* 2000 items */}}
        </>
    );
}

export default ProductSearch