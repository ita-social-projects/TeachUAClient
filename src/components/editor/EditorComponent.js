import React from "react";
import {Editor, EditorState, RichUtils} from "draft-js";
import {addImage, mediaBlockRenderer} from "./plugins/ImagePlugin";
import {addLink} from "./plugins/LinkPlugin";
import {getBlockStyle} from "./BlockSetting";
import './css/Editor.less';
import {Button, Layout} from "antd";
import {convertFromJson, convertToHtml, saveContent} from "./EditorConverter";

export default class EditorComponent extends React.Component {
    state = {editorState: EditorState.createEmpty()};

    focus = () => this.refs.editor.focus();

    onChange = editorState => {
        console.log(1)
        this.setState({editorState});
    };

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );

        if (newState) {
            this.onChange(newState);
        }
    };

    clickAddImage = () => {
        const image = addImage(this.state.editorState);

        if (image) {
            this.setState({editorState: image});
        }
    };

    clickBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType,
            )
        );
    };

    clickAddLink = () => {
        const link = addLink(this.state.editorState);

        if (link) {
            this.onChange(RichUtils.toggleLink(link.newEditorState, link.newEditorState.getSelection(), link.entityKey));
        }
    };

    onSave = () => {
        const cont = saveContent(this.state.editorState.getCurrentContent());

        console.log(cont);

        document.getElementById("test").innerHTML = convertToHtml(cont);
    };

    render() {
        return (
            <div className="editor-container">
                <div className="editor-space">
                    <div onClick={this.focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            blockRendererFn={mediaBlockRenderer}
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            placeholder="Додайте текст і фото"
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
                <div className="editor-toolbar">
                    <BlockStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.clickBlockType}
                    />
                    <StyleButton
                        key="link"
                        style="link"
                        onToggle={this.clickAddLink}
                    />
                    <StyleButton
                        key={"image"}
                        style="image"
                        onToggle={this.clickAddImage}
                    />
                </div>
            </div>
        );
    }
}

class StyleButton extends React.Component {
    onClick = () => {
        this.props.onToggle(this.props.style);
    };

    render() {
        const className = `toolbar-button ${this.props.active ? "toolbar-active-button" : ""} ${this.props.style}`;
        return (
            <div className={className}
                 onMouseDown={this.onClick}/>
        );
    }
}

const BlockStyleControls = ({editorState, onToggle}) => {
    const blockTypes = [
        {style: 'header-two'},
        {style: 'blockquote'},
        {style: 'left'},
        {style: 'center'},
        {style: 'right'},
    ];

    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return blockTypes.map((type) =>
        <StyleButton
            key={type.label}
            active={type.style === blockType}
            icon={type.label}
            onToggle={onToggle}
            style={type.style}
        />
    )
};
