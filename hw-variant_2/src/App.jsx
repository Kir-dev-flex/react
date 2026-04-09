import Tooltip from './Tooltip'
import { useRef, useLayoutEffect, useEffect } from 'react'


import './App.css'

// 2.2

function Child() {
    useLayoutEffect(() => {
      console.log('Child: useLayoutEffect 4'); // 4
      return () => console.log('Child: useLayoutEffect cleanup 5'); // 5
    }, []);
    useEffect(() => {
      console.log('Child: useEffect 7'); //7
      return () => console.log('Child: useEffect cleanup 8');  //8
    }, []);
    console.log('Child: render 6');  // 6
    return <div>Child</div>;
    }
    function Parent() {
      useLayoutEffect(() => {
      console.log('Parent: useLayoutEffect 1'); // Будет первым
    }, []);
    useEffect(() => {
      console.log('Parent: useEffect 3'); // 3
    }, []);
      console.log('Parent: render 2');  // 2
    return <Child />;
}

// Ошибся, вообще ни с чем не угадал.
// Сначала идет render фаза, в ней реакт пробегается по всем компонентам сверху вниз и вызывает их как функции. Занчит сначала будет Parent: render 2, за ним Child: render 6
// Дальше идет commit фаза. Тут уже наши layout и useEffect'ы. Сначала будут layout эффекты, а это значит Parent: useLayoutEffect 1 -> Child: useLayoutEffect 4
// И вот только теперь будут UseEffect'ы, так же СВЕРХУ ВНИЗ: 'Parent: useEffect 3 -> Child: useEffect 7
// А номера 5 и 8 оказались ловушкой. Они рисуются только в строгом режиме из-за двойной перерисовки. А вызываются они только перед перерисовкой себе подобных. Поэтому номера 5 и 8 вставляются ПЕРЕД себе подобным но уже во ВТОРОМ рендере.

function App() {
  const target = useRef(null)

  return (
    <>
      <h1>Privet</h1>
      <div ref={target}>Ref повешан на меня</div>
      <Tooltip text='Blah blah' targetRef={target}/>

      <Parent />
    </>
  )
}

export default App
