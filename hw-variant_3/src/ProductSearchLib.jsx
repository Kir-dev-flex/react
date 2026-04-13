import { useState, useDeferredValue  } from 'react'
import { ProductList } from 'ui-library'; // нельзя менять

function ProductSearchLib({ products }) {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query) //Тут говорим показать старое значение, пока не загрузится
    const filtered = products.filter(p =>
            p.name.toLowerCase().includes(deferredQuery.toLowerCase())
        );
        return (
            <>
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Поиск..."
                />
                <ProductList items={filtered} />
            </>
    );
}

export default ProductSearchLib