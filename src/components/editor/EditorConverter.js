import {convertToRaw, convertFromRaw} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import {convertToHtmlOptions} from "./BlockSetting";

export const saveContent = (content) => {
    return JSON.stringify(convertToRaw(content));
};

export const convertToHtml = (content) => {
    const contentFromRaw = convertFromJson(content);

    return stateToHTML(contentFromRaw, convertToHtmlOptions);
};

export const convertFromJson = (json) => {
    return convertFromRaw(JSON.parse(json));
};

export const getShortContent = (content) => {
    const contentObject = JSON.parse(content);

    let shortDescription = "";

    contentObject.blocks
        .filter(block => block.type !== 'header-two' && block.type !== 'blockquote')
        .map(block => {
            shortDescription += " " + block.text
        });

    if(shortDescription === ' ') {
        return "У цього гуртка немає опису...";
    }

    return shortDescription;
};
