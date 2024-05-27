import React from 'react';
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from '../../BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem';

interface BonadocsEditorViewActionsOutputHeaderProps {
    // Add any props you need here
}

const BonadocsEditorViewActionsOutputHeader: React.FC<BonadocsEditorViewActionsOutputHeaderProps> = (props) => {
    // Add your component logic here

    return (
      <div className="bonadocs__editor__dashboard__playground__method__controlbar">
        <BonadocsEditorViewPlaygroundMethodControlbarItem active={true}>
          Output
        </BonadocsEditorViewPlaygroundMethodControlbarItem>
      </div>
    );
};

export default BonadocsEditorViewActionsOutputHeader;