import React from "react";
import {convertToRaw, Editor, EditorState, RichUtils, setBlockType} from "draft-js";
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import {stateToHTML} from 'draft-js-export-html';
import {addImage, mediaBlockRenderer} from "./plugins/ImagePlugin";
import {addLink} from "./plugins/LinkPlugin";
import {convertToHtmlOptions, getBlockStyle} from "./plugins/BlockSetting";
import './css/Editor.less';
import {Button, Layout} from "antd";

export default class BinsEditor extends React.Component {
    state = {editorState: EditorState.createEmpty()};

    focus = () => this.refs.editor.focus();

    onChange = editorState => {
        this.setState({editorState});
        console.log();
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
        const rawContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

        document.getElementById("test").innerHTML = stateToHTML(this.state.editorState.getCurrentContent(), convertToHtmlOptions);
    };

    render() {
        return (
            <Layout className="temp-lay">
                <div className="editor-box">
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
                <Button onClick={this.onSave}>SAVE</Button>
                <div id="test"></div>
            </Layout>
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
