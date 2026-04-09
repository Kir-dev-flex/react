// 2.3
import { useEffect, useState } from 'react'

function UserCard({ userId }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        let isCurrent = true

        fetchUser(userId).then(data => {
            if (isCurrent) setUser(data);
        });

        return () => {
            isCurrent = false
        } // Вот ключ к победе. В UseEffect существует cleanup функция, которая будет вызываться ДО повторго вызова этого useEffect. То есть мы просто создаем этот флаг isCurrent, и когда случается повторный вызов функции, то этот флаг становится отрицательным, и когда придет "запоздавший" фетч, то из-за этого флага он будет проигнорирован. А вот новый как раз будет с флагов тру. И только с таким флагом можно перезаписать айди. 
    }, [userId]);
    return <div>{user?.name}</div>;
}

export default UserCard
