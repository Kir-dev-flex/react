import { useState } from 'react'


function ProfileEditor({ userId }) {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    // const [avatar, setAvatar] = useState(null); Закомментил, но если бы была здесь ниже картинка с src={avatar}, то был бы тот же эффект, все бы работало.
    
    return (
        // Как мы помним, если родительский пропс меняется, то реакт перерисует все дочерние элементы. А это значит, что нам нужно чтобы внешний пропс менялся, и тогда все что внутри этого компонента перерисуется. В том числе и useState. Да и вообще как я встречал раньше информацию, использовать хук внутри хука может привести к неожиданным последствиям, поэтмоу для себя делаю вывод, что паттер сброса через key - хорошая практика.
    <form key={userId}>  
    <input value={name} onChange={e => setName(e.target.value)} />
    <textarea value={bio} onChange={e => setBio(e.target.value)} />
    </form>
    );
}

export default ProfileEditor