import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { Content } = Layout;
const { Title } = Typography;

const ChallengeDescription = () => {

    return (
        <div>
            <Content>
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onInit={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </Content>
        </div>
    )
}

export default ChallengeDescription;