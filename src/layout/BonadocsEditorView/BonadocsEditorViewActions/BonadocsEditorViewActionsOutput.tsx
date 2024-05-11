import React from 'react';
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from '../BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem';

const BonadocsEditorViewActionsOutput: React.FC = () => {
    return (
      <div className="bonadocs__editor__dashboard__playground__action__output">
        <div className="bonadocs__editor__dashboard__playground__method__controlbar">
          <BonadocsEditorViewPlaygroundMethodControlbarItem active={true}>
            Output
          </BonadocsEditorViewPlaygroundMethodControlbarItem>
        </div>
      </div>
    );
};

export default BonadocsEditorViewActionsOutput;