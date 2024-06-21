import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const BasicTree = () => {
    return (
        <FolderTree
            data={ testData }
            showCheckbox={ false }
        />
    );
};

export default BasicTree;