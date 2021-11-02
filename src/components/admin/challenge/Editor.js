import React from "react";
import ReactQuill, {Quill} from 'react-quill';
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";


class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    //
    // imageHandler = () => {
    //     const input = document.createElement('input');
    //
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();
    //
    //     input.onchange = async () => {
    //         const file = input.files[0];
    //         const formData = new FormData();
    //
    //         formData.append('image', file);
    //
    //         // Save current cursor state
    //         const range = this.quill.getEditor().getSelection(true);
    //
    //         // Insert temporary loading placeholder image
    //         //this.quill.getEditor().insertEmbed(range.index, 'image', `${ window.location.origin }/images/loaders/placeholder.gif`);
    //
    //         // Move cursor to right side of image (easier to continue typing)
    //         this.quill.getEditor().setSelection(range.index + 1);
    //
    //         const res = new XMLHttpRequest();
    //         res.open("POST", UPLOAD_IMAGE_URL, false);
    //         res.send(formData);
    //
    //         // Remove placeholder image
    //         this.quill.getEditor().deleteText(range.index, 1);
    //
    //         // Insert uploaded image
    //         this.quill.getEditor().insertEmbed(range.index, 'image', res.body.image);
    //     }
    // }


    handleOnChange(html, delta, source) {
        const { onChange } = this.props;

        if (source === 'user') {
            onChange(html);
        }
    }

    handleOnBlur(range, source, quill) {
        const { onBlur } = this.props;

        if (source === 'user') {
            onBlur(quill.getHTML());
        }
    }

    render() {
        const { value } = this.props;
        const modules = {
            toolbar: {
                container: [
                    [{header: [1, 2, 3, 4, 5, 6, 'normal']}],
                    [{size: []}],
                    [{align: []}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [
                        {list: 'ordered'},
                        {list: 'bullet'},
                        {indent: '-1'},
                        {indent: '+1'},
                    ],
                    ['link', 'video', 'image', 'clean'],
                ],
            },
        };

        return (
            <div>
            <ReactQuill
                value={value || ''}
                onChange={this.handleOnChange}
                //onBlur={this.handleOnBlur}
                modules={modules}
                ref={(el) => this.quill = el}
                theme="snow">
            </ReactQuill>
            </div>
        );
    }
}

export default Editor;