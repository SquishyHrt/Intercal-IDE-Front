// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/electron-vite.animate.svg'
import '../App.css'
import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

function App() {
    const onTreeStateChange = (state, event) => console.log(state, event);

    return (
        <FolderTree
            data={ testData }
            onChange={ onTreeStateChange }
        />
    );
}

export default App
