import {AtomicBlockUtils, EditorState} from "draft-js";
import React from "react";
import AlignLeftOutlined from "@ant-design/icons/lib/icons/AlignLeftOutlined";
import AlignRightOutlined from "@ant-design/icons/lib/icons/AlignRightOutlined";
import PicRightOutlined from "@ant-design/icons/lib/icons/PicRightOutlined";
import PicLeftOutlined from "@ant-design/icons/lib/icons/PicLeftOutlined";
import {PicCenterOutlined} from "@ant-design/icons";

export const addImage = (editorState) => {
    const urlValue = window.prompt("Paste Image Link");

    if (!urlValue) {
        return false;
    }

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
        "image",
        "IMMUTABLE",
        {
            src: urlValue,
            className: "edited-image edited-image-left"
        }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        {currentContent: contentStateWithEntity}
    );

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
};

export const mediaBlockRenderer = (block) => {
    if (block.getType() === "atomic") {
        return {
            component: Media,
            editable: false
        };
    }

    return null;
};

const Image = ({src, entity, id}) => {
    const leftWithText = () => {
        entity.getData().className = "edited-image edited-image-left";
        document.getElementById(id).style="position: relative; float:left;";
    };

    const rightWithText = () => {
        entity.getData().className = "edited-image edited-image-right";
        document.getElementById(id).style="position: relative; float:right;";
    };

    const leftWithoutText = () => {
        entity.getData().className = "edited-image edited-image-left-without-text";
        document.getElementById(id).style="justify-content: flex-start;";
    };

    const rightWithoutText = () => {
        entity.getData().className = "edited-image edited-image-right-without-text";
        document.getElementById(id).style="justify-content: flex-end;";
    };

    const center = () => {
        entity.getData().className = "edited-image edited-image-center";
        document.getElementById(id).style="margin: 0 auto; width: 40%;";
    };

    return (
        <div className="image-editor" id={id} style={{position: 'relative', float:'left'}}>
            <img src={src} />
            <div className="image-controls">
                <div onClick={leftWithText}><PicLeftOutlined /></div>
                <div onClick={center}><PicCenterOutlined /></div>
                <div onClick={rightWithText}><PicRightOutlined /></div>
                <div onClick={rightWithoutText}><AlignRightOutlined /></div>
                <div onClick={leftWithoutText}><AlignLeftOutlined /></div>
            </div>
        </div>);
};

const Media = ({contentState, block}) => {
    if(block.getEntityAt(0) === null) {
        return false;
    }

    const entity = contentState.getEntity(block.getEntityAt(0));
    const {src} = entity.getData();
    const type = entity.getType();

    let media;

    if (type === "image") {
        media = <Image src={src} entity={entity} id={block.getKey()}/>;
    }

    return media;
};